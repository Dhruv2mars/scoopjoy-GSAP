export interface Flavor {
  id: string;
  name: string;
  color: string;
  description: string;
  ingredients: string[];
  price: number;
  popular?: boolean;
}

export const flavors: Flavor[] = [
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    color: "#ff9999",
    description: "Sweet and tangy with real strawberry chunks that burst with summer flavor",
    ingredients: ["Fresh strawberries", "Organic cream", "Pure vanilla", "Cane sugar"],
    price: 4.99,
    popular: true,
  },
  {
    id: "mint-chip",
    name: "Mint Chip",
    color: "#99ffcc",
    description: "Cool and refreshing mint with dark chocolate chips for the perfect balance",
    ingredients: ["Fresh mint leaves", "Dark chocolate chips", "Heavy cream", "Natural mint extract"],
    price: 5.49,
    popular: true,
  },
  {
    id: "chocolate-dream",
    name: "Chocolate Dream",
    color: "#8B4513",
    description: "Rich, decadent chocolate made with premium Belgian cocoa",
    ingredients: ["Belgian cocoa", "Heavy cream", "Dark chocolate", "Brown sugar"],
    price: 5.99,
  },
  {
    id: "vanilla-bean",
    name: "Vanilla Bean",
    color: "#FFF8DC",
    description: "Classic vanilla with real Madagascar vanilla bean specks",
    ingredients: ["Madagascar vanilla beans", "Organic cream", "Whole milk", "Pure cane sugar"],
    price: 4.49,
  },
  {
    id: "blueberry-cheesecake",
    name: "Blueberry Cheesecake",
    color: "#6495ED",
    description: "Creamy cheesecake flavor swirled with fresh blueberry compote",
    ingredients: ["Fresh blueberries", "Cream cheese", "Graham cracker pieces", "Lemon zest"],
    price: 6.49,
    popular: true,
  },
  {
    id: "pistachio-rose",
    name: "Pistachio Rose",
    color: "#93C572",
    description: "Exotic blend of roasted pistachios with a hint of rose water",
    ingredients: ["Roasted pistachios", "Rose water", "Heavy cream", "Honey"],
    price: 7.99,
  },
];

export const toppings = [
  {
    id: "rainbow-sprinkles",
    name: "Rainbow Sprinkles",
    color: "#ff6b6b",
    price: 0.50,
  },
  {
    id: "chocolate-chips",
    name: "Chocolate Chips",
    color: "#8B4513",
    price: 0.75,
  },
  {
    id: "fresh-cherry",
    name: "Fresh Cherry",
    color: "#dc2626",
    price: 1.00,
  },
  {
    id: "whipped-cream",
    name: "Whipped Cream",
    color: "#ffffff",
    price: 0.50,
  },
  {
    id: "caramel-drizzle",
    name: "Caramel Drizzle",
    color: "#d97706",
    price: 0.75,
  },
  {
    id: "crushed-oreo",
    name: "Crushed Oreo",
    color: "#1f2937",
    price: 1.25,
  },
];

export const coneTypes = [
  {
    id: "waffle-cone",
    name: "Waffle Cone",
    description: "Crispy and sweet waffle cone",
    price: 1.00,
  },
  {
    id: "sugar-cone",
    name: "Sugar Cone",
    description: "Classic sugar cone",
    price: 0.75,
  },
  {
    id: "chocolate-cone",
    name: "Chocolate Cone",
    description: "Chocolate-dipped waffle cone",
    price: 1.50,
  },
];