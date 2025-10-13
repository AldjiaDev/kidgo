import { Loading, SkeletonItem, SkeletonSection } from '~/components/Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Loading,
};

export const Default = () => <Loading />;
export const DefaultSkeletonItem = () => <SkeletonItem />;
export const DefaultSkeletonSection = () => <SkeletonSection />;
