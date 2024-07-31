export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  is_published: boolean;
}

export type Menu = {
  id: number
  menu_name: string
  price: number
  img_url: string
  rating: number
}

export type OrderMenu = {
  map(arg0: (data: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: number
  menu_id: number
  count: number
}
