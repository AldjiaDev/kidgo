interface CreateIssueOptions {
  category: string;
  message: string;
  userEmail?: string;
}

interface GitHubIssue {
  title: string;
  body: string;
  labels?: string[];
}

interface GitHubAPIResponse {
  success: boolean;
  error?: string;
  issueUrl?: string;
}

/**
 * Create a GitHub issue using the GitHub REST API
 */
export async function createGitHubIssue({
  category,
  message,
  userEmail,
}: CreateIssueOptions): Promise<GitHubAPIResponse> {
  try {
    // Environment variables that need to be set
    const GITHUB_TOKEN = process.env.EXPO_PUBLIC_GITHUB_TOKEN;
    const GITHUB_OWNER = process.env.EXPO_PUBLIC_GITHUB_OWNER || 'AldjiaDev';
    const GITHUB_REPO = process.env.EXPO_PUBLIC_GITHUB_REPO || 'kidgo';

    // Validate required configuration
    if (!GITHUB_TOKEN) {
      return {
        success: false,
        error: 'Configuration GitHub manquante. Veuillez contacter le support.',
      };
    }

    // Validate input data
    if (!category || !message) {
      return {
        success: false,
        error: 'Catégorie et message sont requis.',
      };
    }

    if (message.length < 10) {
      return {
        success: false,
        error: 'Le message doit contenir au moins 10 caractères.',
      };
    }

    // Format the issue content
    const issueTitle = `[Feedback] ${category}`;
    const issueBody = formatIssueBody({ category, message, userEmail });

    const issue: GitHubIssue = {
      title: issueTitle,
      body: issueBody,
      labels: ['feedback', getCategoryLabel(category)],
    };

    // Make API request to GitHub with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'KidGo-App/1.0',
        },
        body: JSON.stringify(issue),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific GitHub API errors
      if (response.status === 401) {
        return {
          success: false,
          error: "Erreur d'authentification GitHub. Veuillez contacter le support.",
        };
      }

      if (response.status === 403) {
        return {
          success: false,
          error: 'Limite de taux GitHub atteinte. Veuillez réessayer plus tard.',
        };
      }

      if (response.status === 404) {
        return {
          success: false,
          error: 'Dépôt GitHub introuvable. Veuillez contacter le support.',
        };
      }

      if (response.status >= 500) {
        return {
          success: false,
          error: 'Erreur serveur GitHub. Veuillez réessayer plus tard.',
        };
      }

      // Generic error for other HTTP status codes
      return {
        success: false,
        error: `Erreur GitHub (${response.status}): ${errorData.message || 'Erreur inconnue'}`,
      };
    }

    const responseData = await response.json();

    return {
      success: true,
      issueUrl: responseData.html_url,
    };
  } catch (error) {
    // Handle network and other errors
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: "Délai d'attente dépassé. Vérifiez votre connexion internet.",
        };
      }

      if (error.message.includes('Network') || error.message.includes('fetch')) {
        return {
          success: false,
          error: 'Erreur de connexion. Vérifiez votre connexion internet.',
        };
      }
    }

    return {
      success: false,
      error: "Une erreur inattendue s'est produite. Veuillez réessayer.",
    };
  }
}

/**
 * Format the issue body with structured feedback information
 */
function formatIssueBody({ category, message, userEmail }: CreateIssueOptions): string {
  const timestamp = new Date().toLocaleString('fr-FR');

  return `## Feedback utilisateur

**Catégorie:** ${category}

**Message:**
${message}

---

**Informations techniques:**
- **Date:** ${timestamp}
- **Utilisateur:** ${userEmail || 'Anonyme'}
- **Source:** Application mobile KidGo

_Ce feedback a été automatiquement créé depuis l'application KidGo._`;
}

/**
 * Convert feedback category to GitHub label
 */
function getCategoryLabel(category: string): string {
  const labelMap: Record<string, string> = {
    "Amélioration de l'application": 'feature',
    'Problème technique': 'bug',
    'Nouveau lieu à ajouter': 'new-place',
    'Lieu incorrect': 'data-issue',
    Autre: 'other',
  };

  return labelMap[category] || 'feedback';
}
