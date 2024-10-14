export type KindeUser = {
    id: string;
    family_name: string | any;
    given_name: string | null;
    email: string | null;
    picture: string | null;
    username: string | null | undefined;
    phone_number: string | null | undefined;
}

export type CreateBoardType = {
    title: string;
    description: string | any;
}

export type CreatePinType = {
    title: string;
  description: string;
  pinOriginUrl: string;
  board: string;
  pincolor:string;
  category: string;
  topics: string;
  imageUrl: string
}

export type SinglePinType = {
    _id:string;
     name:string;
    creator: {
      username: string;
      author_image: string;
      _id:string;
    };
    url_location:string;
     pin_image:string;
    note:string
    slug: { current: string, _type: string }
}

export type SingleBoardType = {
  creator:{username:string}
  description:string;
  name:string;
  slug: {current:string; _type:string};
  _id:string;
  _updatedAt:any;
}
