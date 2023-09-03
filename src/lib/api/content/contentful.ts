export const getSpaceId = async () => {
  const response = await fetch(
    'https://o2c5ktfj79.execute-api.us-east-1.amazonaws.com/default/contentful-space-id',
    {
      method: 'GET',
      // headers: {
      //   id: chrome.runtime.id
      // }
    }
  );

  const data = await response.json();

  return data;
};

export const getAccessToken = async () => {
  const response = await fetch(
    'https://oasvkjsx5a.execute-api.us-east-1.amazonaws.com/default/contentful-access-token',
    {
      method: 'GET',
      // headers: {
      //   id: chrome.runtime.id
      // }
    }
  );

  const data = await response.json();

  return data;
};

export type ContentfullVideos = {
  sys: {
    type: string;
  };
  total: 39;
  skip: 0;
  limit: 100;
  items: ContentfulItem[];
};

export type ContentfulItem = {
  metadata: {
    tags: [
      {
        sys: {
          type: string;
          linkType: string;
          id: string;
        };
      }
    ];
  };
  sys: {
    space: {
      sys: {
        type: string;
        linkType: string;
        id: string;
      };
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    revision: 7;
    locale: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      details: {
        size: number;
      };
      fileName: string;
      contentType: string;
    };
  };
};

export const fetchVideos = async (
  tag1: string,
  tag2?: string,
  tag3?: string
): Promise<ContentfullVideos | undefined> => {
  const id = await getSpaceId();
  const token = await getAccessToken();
  let url;
  if (tag1 && tag2 && tag3) {
    url = `https://cdn.contentful.com/spaces/${id}/environments/master/assets?access_token=${token}&metadata.tags.sys.id[in]=${tag1},${tag2},${tag3}`;
  } else if (tag1) {
    url = `https://cdn.contentful.com/spaces/${id}/environments/master/assets?access_token=${token}&metadata.tags.sys.id[in]=${tag1}`;
  } else {
    console.error('Type Missing!');
  }

  if (url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) console.error('Fetch failed.');
    const data = await response.json();

    return data;
  }
};
