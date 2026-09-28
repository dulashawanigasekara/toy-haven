// =====Toy Haven Product List=====

// *Toy Cars*
const products = [
  {
    id: 1,
    name: "Speedster Racing Car",
    category: "Toy Cars",
    price: 2490,
    image: "./Images/Products/Toy1.png",
    description: "A colourful racing car made for fast-paced pretend races and imaginative adventures.",
    isNew: false
  },

  {
    id: 2,
    name: "Mini Police Car",
    category: "Toy Cars",
    price: 2000,
    image: "./Images/Products/Toy2.png",
    description: "A compact police car toy perfect for exciting rescue missions and creative role play.",
    isNew: true
  },

  {
    id: 3,
    name: "Monster Truck",
    category: "Toy Cars",
    price: 3290,
    image: "./Images/Products/Toy3.png",
    description: "A rugged monster truck with large wheels designed for adventurous indoor and outdoor play.",
    isNew: false
  },

  {
    id: 4,
    name: "Turbo Drift Racer",
    category: "Toy Cars",
    price: 2790,
    image: "./Images/Products/Toy4.png",
    description: "A sporty toy racing car with bold details, smooth wheels and a sleek design made for exciting pretend races and fast-paced play.",
    isNew: false
  },

  {
    id: 5,
    name: "City Fire Engine",
    category: "Toy Cars",
    price: 3490,
    image: "./Images/Products/Toy5.png",
    description: "A bright fire engine toy that encourages rescue-themed adventures and imaginative play.",
    isNew: true
  },

  {
    id: 6,
    name: "Construction Dump Truck",
    category: "Toy Cars",
    price: 3000,
    image: "./Images/Products/Toy6.png",
    description: "A sturdy dump truck designed for construction-themed play and creative building adventures.",
    isNew: false
  },

  {
    id: 7,
    name: "Off-Road Adventure Jeep",
    category: "Toy Cars",
    price: 3190,
    image: "./Images/Products/Toy7.webp",
    description: "A fun off-road jeep made for exciting pretend journeys across adventurous terrains.",
    isNew: true
  },

  {
    id: 8,
    name: "Mini Car Collection",
    category: "Toy Cars",
    price: 3990,
    image: "./Images/Products/Toy8.png",
    description: "A colourful collection of mini cars for racing, sharing and imaginative city adventures.",
    isNew: false
  },

  // *Bath Toys*
  {
    id: 9,
    name: "Floating Duck Family",
    category: "Bath Toys",
    price: 1690,
    image: "./Images/Products/Toy9.png",
    description: "A cheerful family of floating ducks that makes bath time more playful and enjoyable.",
    isNew: false
  },

  {
    id: 10,
    name: "Ocean Animal Bath Set",
    category: "Bath Toys",
    price: 2190,
    image: "./Images/Products/Toy10.png",
    description: "A colourful set of ocean animal toys designed for fun water play during bath time.",
    isNew: true
  },
    
  {
    id: 11,
    name: "Stacking Bath Cups",
    category: "Bath Toys",
    price: 1490,
    image: "./Images/Products/Toy11.png",
    description: "Bright stacking cups for pouring, scooping and exploring water through simple bath-time games.",
    isNew: false 
  },

  {
    id: 12,
    name: "Splashy Whale Toy",
    category: "Bath Toys",
    price: 1790,
    image: "./Images/Products/Toy12.png",
    description: "A friendly whale bath toy designed to float and add extra fun to water play.",
    isNew: false 
  },

  {
    id: 13,
    name: "Fishing Fun Bath Set",
    category: "Bath Toys",
    price: 2590,
    image: "./Images/Products/Toy13.png",
    description: "A playful fishing set that lets children catch colourful floating sea creatures during bath time.",
    isNew: true 
  },

  {
    id: 14,
    name: "Floating Boat Set",
    category: "Bath Toys",
    price: 1990,
    image: "./Images/Products/Toy14.png",
    description: "A set of colourful floating boats perfect for creating little water adventures in the bath.",
    isNew: false
  },

  {
    id: 15,
    name: "Water Spray Animals",
    category: "Bath Toys",
    price: 1890,
    image: "./Images/Products/Toy15.png",
    description: "Soft animal toys that spray water for interactive and entertaining bath-time play.",
    isNew: true
  },

  {
    id: 16,
    name: "Bath Time Water Wheel",
    category: "Bath Toys",
    price: 2390,
    image: "./Images/Products/Toy16.png",
    description: "A colourful water wheel toy that encourages pouring, spinning and simple water exploration.",
    isNew: false
  },

  // *Board & Crad Games
  {
    id: 17,
    name: "Classic Snakes and Ladders",
    category: "Board & Card Games",
    price: 1890,
    image: "./Images/Products/Toy17.png",
    description: "A family-friendly classic board game filled with exciting climbs and surprising slides.",
    isNew: false
  },

  {
    id: 18,
    name: "Kids Memory Match",
    category: "Board & Card Games",
    price: 1890,
    image: "./Images/Products/Toy18.png",
    description: "A colourful matching card game designed to encourage memory, concentration and recognition skills.",
    isNew: false
  },

  {
    id: 19,
    name: "Junior Chess Set",
    category: "Board & Card Games",
    price: 2990,
    image: "./Images/Products/Toy19.png",
    description: "A beginner-friendly chess set for learning strategy, planning and logical thinking through play.",
    isNew: false
  },

  {
    id: 20,
    name: "Family Ludo Game",
    category: "Board & Card Games",
    price: 1890,
    image: "./Images/Products/Toy20.png",
    description: "A colourful Ludo board game designed for fun and friendly competition with family and friends.",
    isNew: false
  },

  {
    id: 21,
    name: "Animal Matching Cards",
    category: "Board & Card Games",
    price: 1390,
    image: "./Images/Products/Toy21.png",
    description: "Cute animal-themed cards that make matching and memory games entertaining for young children.",
    isNew: true
  },

  {
    id: 22,
    name: "Kids Domino Set",
    category: "Board & Card Games",
    price: 1390,
    image: "./Images/Products/Toy22.jfif",
    description: "A colourful domino set created for simple matching games and enjoyable family play.",
    isNew: false
  },

  {
    id: 23,
    name: "Treasure Hunt Board Game",
    category: "Board & Card Games",
    price: 2590,
    image: "./Images/Products/Toy23.png",
    description: "An adventure-themed board game where young players race to discover hidden treasure.",
    isNew: true
  },

  {
    id: 24,
    name: "Junior Puzzle Challenge",
    category: "Board & Card Games",
    price: 2290,
    image: "./Images/Products/Toy24.png",
    description: "A fun puzzle game designed to encourage problem-solving, observation and creative thinking.",
    isNew: false
  },

  // *Dolls*
  {
    id: 25,
    name: "Princess Ella Doll",
    category: "Dolls",
    price: 3290,
    image: "./Images/Products/Toy25.png",
    description: "A charming princess doll dressed for magical adventures, storytelling and imaginative play.",
    isNew: false
  },

  {
    id: 26,
    name: "Little Baby Doll",
    category: "Dolls",
    price: 2890,
    image: "./Images/Products/Toy26.png",
    description: "A sweet baby doll designed for caring, nurturing and creative everyday role play.",
    isNew: true
  },

  {
    id: 27,
    name: "Fashion Star Doll",
    category: "Dolls",
    price: 3490,
    image: "./Images/Products/Toy27.png",
    description: "A stylish fashion doll with a colourful outfit for dress-up games and imaginative stories.",
    isNew: false
  },

  {
    id: 28,
    name: "Ballerina Grace Doll",
    category: "Dolls",
    price: 3590,
    image: "./Images/Products/Toy28.png",
    description: "A graceful ballerina doll wearing a beautiful dance outfit for creative performance-themed play.",
    isNew: false
  },

  {
    id: 29,
    name: "Doctor Mia Doll",
    category: "Dolls",
    price: 3690,
    image: "./Images/Products/Toy29.png",
    description: "A friendly doctor-themed doll that encourages caring stories and imaginative professional role play.",
    isNew: true
  },

  {
    id: 30,
    name: "Adventure Girl Doll",
    category: "Dolls",
    price: 2990,
    image: "./Images/Products/Toy30.png",
    description: "An adventure-ready doll designed to inspire outdoor stories, exploration and imaginative journeys.",
    isNew: false
  },

  {
    id: 31,
    name: "Fairy Dream Doll",
    category: "Dolls",
    price: 3390,
    image: "./Images/Products/Toy31.png",
    description: "A colourful fairy doll with magical styling for fantasy stories and creative pretend play.",
    isNew: true
  },

  {
    id: 32,
    name: "Best Friends Doll Set",
    category: "Dolls",
    price: 5000,
    image: "./Images/Products/Toy32.png",
    description: "A two-doll friendship set designed for shared adventures, storytelling and imaginative play.",
    isNew: false
  },

  // *Riding Toys*
  {
    id: 33,
    name: "Mini Racing Ride-On Car",
    category: "Riding Toys",
    price: 7990,
    image: "./Images/Products/Toy33.png",
    description: "A colourful ride-on racing car designed for active indoor and outdoor adventures.",
    isNew: false
  },

  {
    id: 34,
    name: "Happy Kids Scooter",
    category: "Riding Toys",
    price: 6490,
    image: "./Images/Products/Toy34.webp",
    description: "A fun children's scooter designed for active play, balance practice and outdoor enjoyment.",
    isNew: true
  },

  {
    id: 35,
    name: "Little Rider Bike",
    category: "Riding Toys",
    price: 8490,
    image: "./Images/Products/Toy35.jpg",
    description: "A beginner-friendly ride-on bike that encourages balance, movement and active play.",
    isNew: false
  },

  {
    id: 36,
    name: "Animal Ride-On Toy",
    category: "Riding Toys",
    price: 7290,
    image: "./Images/Products/Toy36.avif",
    description: "A cute animal-themed ride-on toy that combines movement, play and imaginative adventures.",
    isNew: false
  },

  {
    id: 37,
    name: "Junior Balance Bike",
    category: "Riding Toys",
    price: 8990,
    image: "./Images/Products/Toy37.webp",
    description: "A simple balance bike designed to help young riders practise coordination and confidence.",
    isNew: true
  },

  {
    id: 38,
    name: "Push and Ride Car",
    category: "Riding Toys",
    price: 7790,
    image: "./Images/Products/Toy38.jpg",
    description: "A sturdy push-and-ride car suitable for active play and little everyday adventures.",
    isNew: false
  },

  {
    id: 39,
    name: "Three Wheel Kids Scooter",
    category: "Riding Toys",
    price: 6990,
    image: "./Images/Products/Toy39.jpg",
    description: "A stable three-wheel scooter designed to make outdoor riding comfortable and enjoyable.",
    isNew: true
  },

  {
    id: 40,
    name: "Adventure Ride-On Jeep",
    category: "Riding Toys",
    price: 9490,
    image: "./Images/Products/Toy40.png",
    description: "A fun jeep-style ride-on toy created for exciting pretend journeys and active play.",
    isNew: false
  },

  // *Stuffed & Plush Animals*
  {
    id: 41,
    name: "Cuddly Teddy Bear",
    category: "Stuffed & Plush Animals",
    price: 2790,
    image: "./Images/Products/Toy41.jfif",
    description: "A soft and cuddly teddy bear perfect for hugs, bedtime companionship and imaginative play.",
    isNew: false
  },

  {
    id: 42,
    name: "Dreamy Glow Bunny",
    category: "Stuffed & Plush Animals",
    price: 2490,
    image: "./Images/Products/Toy42.webp",
    description: "A gentle plush bunny with soft fur, glowing, perfect for cuddles and comforting everyday companionship.",
    isNew: true
  },

  {
    id: 43,
    name: "Little Elephant Plush",
    category: "Stuffed & Plush Animals",
    price: 2690,
    image: "./Images/Products/Toy43.jfif",
    description: "A soft elephant companion with a friendly design for cuddles, comfort and pretend play.",
    isNew: false
  },

  {
    id: 44,
    name: "Rainbow Unicorn Plush",
    category: "Stuffed & Plush Animals",
    price: 3190,
    image: "./Images/Products/Toy44.jfif",
    description: "A colourful unicorn plush that adds a magical touch to cuddles and imaginative stories.",
    isNew: true
  },

  {
    id: 45,
    name: "Happy Panda Plush",
    category: "Stuffed & Plush Animals",
    price: 2890,
    image: "./Images/Products/Toy45.jfif",
    description: "A cute panda plush toy designed for cuddling, decorating bedrooms and imaginative adventures.",
    isNew: false
  },

  {
    id: 46,
    name: "Sleepy Puppy Plush",
    category: "Stuffed & Plush Animals",
    price: 2590,
    image: "./Images/Products/Toy46.jfif",
    description: "A lovable puppy plush designed to be a soft companion for bedtime and everyday cuddles.",
    isNew: false
  },

  {
    id: 47,
    name: "Friendly Lion Plush",
    category: "Stuffed & Plush Animals",
    price: 2990,
    image: "./Images/Products/Toy47.webp",
    description: "A soft lion plush with a friendly expression for imaginative adventures and cosy cuddles.",
    isNew: true
  },

  {
    id: 48,
    name: "Cute Koala Plush",
    category: "Stuffed & Plush Animals",
    price: 2790,
    image: "./Images/Products/Toy48.jpeg",
    description: "A charming koala plush made for hugs, room decoration and gentle imaginative play.",
    isNew: false
  }
]