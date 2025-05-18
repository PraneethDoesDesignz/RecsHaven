import { Dock } from "./dock-two";
import {
  Home,
  Book,
  Utensils,
  Film,
  Plane,
  Heart,
  Sparkles
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Book, label: "Books", path: "/books" },
  { icon: Utensils, label: "Restaurants", path: "/restaurants" },
  { icon: Film, label: "Movies", path: "/movies" },
  { icon: Plane, label: "Travel", path: "/travel" },
  { icon: Heart, label: "Wishlist", path: "/wishlist" },
  { icon: Sparkles, label: "Randomizer", path: "/randomizer" }
];

export function DockNav() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Dock
      items={items.map(item => ({
        ...item,
        onClick: () => navigate(item.path),
        active: location.pathname.startsWith(item.path)
      }))}
    />
  );
} 