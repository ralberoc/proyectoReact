const postRequestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};

export const postWrapper = (url: string, data: any) => {
  const header = { ...postRequestOptions, ...data };
  return fetch(url, header);
};

export const getWrapper = (url: string) => fetch(url);
