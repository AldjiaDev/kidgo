import Tabs from '~/components/ui/Tabs';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" title="Recherche" systemImage="magnify" />
      <Tabs.Screen name="(map)" title="Carte" systemImage="map" />
      <Tabs.Screen name="(settings)" title="Profile" systemImage="cog" />
      <Tabs.Screen name="+not-found" title="Non trouvé" options={{ href: null }} />
      <Tabs.Screen name="index" title="Index" options={{ href: null }} />
    </Tabs>
  );
}
