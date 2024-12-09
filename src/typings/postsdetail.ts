
interface Author  {
    username: string;
    profileUrl: string;
  };
  
  interface Photo {
    id: number;
    photoUrl: string;
  };
  
  export interface Reply  {
    id: number;
    parentId: number | null;
    author: {
      nickname: string;
      profileUrl: string;
    };
    content: string;
    likes: number | null;
    repliedAt: string;
  };
  
   export interface PostDetailProps  {
    id: number;
    title: string;
    content: string;
    author: Author;
    views: number;
    likes: number;
    rating: number;
    liked: boolean;
    scraped: boolean;
    category: string;
    postedAt: string;
    photos: Photo[];
    replies?: Reply[];
    nextReplyUrl: string;
  };
  