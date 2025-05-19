import { Tag, Heart, Star, UserCircle, User, MapPin, Film, DollarSign } from "lucide-react";

export enum FilterType {
  GENRE = "Genre",
  CUISINE = "Cuisine",
  LIKES = "Likes",
  RECOMMENDATIONS = "Recommendations",
  FAVOURITES = "Your Favourites",
  AUTHOR = "Author",
  DIRECTOR = "Director",
  LOCATION = "Location",
  APPROX_EXPENDITURE = "Approx Expenditure",
}

export type FilterOption = {
  name: string;
  icon: React.ReactNode | undefined;
  label?: string;
};

export const genreOptions: FilterOption[] = [
  { name: "Classic", icon: undefined },
  { name: "Fiction", icon: undefined },
  { name: "Drama", icon: undefined },
  { name: "Dystopian", icon: undefined },
  { name: "Science Fiction", icon: undefined },
  { name: "Political", icon: undefined },
  { name: "Social Issues", icon: undefined },
  { name: "Romance", icon: undefined },
  { name: "Adventure", icon: undefined },
  { name: "Realism", icon: undefined },
  { name: "Fantasy", icon: undefined },
  { name: "Children's", icon: undefined },
];

export const cuisineOptions: FilterOption[] = [
  { name: "Italian", icon: undefined },
  { name: "Pasta", icon: undefined },
  { name: "Dessert", icon: undefined },
  { name: "Japanese", icon: undefined },
  { name: "Sushi", icon: undefined },
  { name: "Asian", icon: undefined },
  { name: "American", icon: undefined },
  { name: "Burgers", icon: undefined },
  { name: "Fast Food", icon: undefined },
  { name: "Mexican", icon: undefined },
  { name: "Tacos", icon: undefined },
  { name: "Street Food", icon: undefined },
  { name: "Indian", icon: undefined },
  { name: "Curry", icon: undefined },
  { name: "Spicy", icon: undefined },
  { name: "Pizza", icon: undefined },
  { name: "Vegan", icon: undefined },
  { name: "Plant-Based", icon: undefined },
  { name: "Healthy", icon: undefined },
  { name: "Steak", icon: undefined },
  { name: "Grilled", icon: undefined },
  { name: "Premium", icon: undefined },
  { name: "Seafood", icon: undefined },
  { name: "Ocean View", icon: undefined },
  { name: "Fresh", icon: undefined },
  { name: "Cakes", icon: undefined },
  { name: "Pastries", icon: undefined },
];

export const authorOptions: FilterOption[] = [
  { name: "F. Scott Fitzgerald", icon: undefined },
  { name: "George Orwell", icon: undefined },
  { name: "Harper Lee", icon: undefined },
  { name: "Jane Austen", icon: undefined },
  { name: "Herman Melville", icon: undefined },
  { name: "J.D. Salinger", icon: undefined },
  { name: "J.R.R. Tolkien", icon: undefined },
  { name: "Aldous Huxley", icon: undefined },
  { name: "Charlotte Brontë", icon: undefined },
];

export const likesOptions: FilterOption[] = [
  { name: "Most Liked", icon: undefined },
  { name: "Least Liked", icon: undefined },
];

export const expenditureOptions: FilterOption[] = [
  { name: "Most Expensive", icon: undefined },
  { name: "Least Expensive", icon: undefined },
];

export const directorOptions: FilterOption[] = [
  { name: "Christopher Nolan", icon: undefined },
  { name: "Frank Darabont", icon: undefined },
  { name: "Francis Ford Coppola", icon: undefined },
  { name: "Quentin Tarantino", icon: undefined },
  { name: "Robert Zemeckis", icon: undefined },
  { name: "The Wachowskis", icon: undefined },
  { name: "David Fincher", icon: undefined },
  { name: "Roger Allers and Rob Minkoff", icon: undefined },
];

export const locationOptions: FilterOption[] = [
  { name: "Rome, Italy", icon: undefined },
  { name: "Tokyo, Japan", icon: undefined },
  { name: "New York, USA", icon: undefined },
  { name: "Mexico City, Mexico", icon: undefined },
  { name: "Bangalore, India", icon: undefined },
  { name: "Naples, Italy", icon: undefined },
  { name: "Berlin, Germany", icon: undefined },
  { name: "Sydney, Australia", icon: undefined },
  { name: "Paris, France", icon: undefined },
];

export function filterViewOptions(screenType: "books" | "restaurants" | "movies" | "travel") {
  switch (screenType) {
    case "books":
      return [
        [
          { name: FilterType.GENRE, icon: <Tag /> },
          { name: FilterType.LIKES, icon: <Heart /> },
          { name: FilterType.AUTHOR, icon: <User /> },
          { name: FilterType.RECOMMENDATIONS, icon: <UserCircle /> },
          { name: FilterType.FAVOURITES, icon: <Star /> },
        ],
      ];
    case "restaurants":
      return [
        [
          { name: FilterType.CUISINE, icon: <Tag /> },
          { name: FilterType.LIKES, icon: <Heart /> },
          { name: FilterType.LOCATION, icon: <MapPin /> },
          { name: FilterType.RECOMMENDATIONS, icon: <UserCircle /> },
          { name: FilterType.FAVOURITES, icon: <Star /> },
        ],
      ];
    case "movies":
      return [
        [
          { name: FilterType.GENRE, icon: <Tag /> },
          { name: FilterType.LIKES, icon: <Heart /> },
          { name: FilterType.DIRECTOR, icon: <Film /> },
          { name: FilterType.RECOMMENDATIONS, icon: <UserCircle /> },
          { name: FilterType.FAVOURITES, icon: <Star /> },
        ],
      ];
    case "travel":
      return [
        [
          { name: FilterType.LIKES, icon: <Heart /> },
          { name: FilterType.APPROX_EXPENDITURE, icon: <DollarSign /> },
          { name: FilterType.RECOMMENDATIONS, icon: <UserCircle /> },
          { name: FilterType.FAVOURITES, icon: <Star /> },
        ],
      ];
    default:
      return [];
  }
}

export const filterViewToFilterOptions: Record<FilterType, FilterOption[]> = {
  [FilterType.GENRE]: genreOptions,
  [FilterType.CUISINE]: cuisineOptions,
  [FilterType.LIKES]: likesOptions,
  [FilterType.RECOMMENDATIONS]: [],
  [FilterType.FAVOURITES]: [],
  [FilterType.AUTHOR]: authorOptions,
  [FilterType.DIRECTOR]: directorOptions,
  [FilterType.LOCATION]: locationOptions,
  [FilterType.APPROX_EXPENDITURE]: expenditureOptions,
};
