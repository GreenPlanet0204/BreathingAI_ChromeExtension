import { ContentCollection } from '../../api/content/types';

const getBookmarkedContent = (
  contentCollection: ContentCollection
): ContentCollection => {
  const collection = contentCollection.content.filter(
    (content) => content.bookmarked === true
  );
  return {
    content: collection,
    total: collection.length,
  };
};
export default getBookmarkedContent;
