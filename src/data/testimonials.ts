import { unsplash } from "../lib/unsplash";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  image: string;
  imageAlt: string;
};

export const testimonialsHeading = "Our clients love to talk about us";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    role: "Homeowner",
    quote:
      "Hearth & Grain completely changed the way we live at home. Their attention to detail, beautiful designs and professional team made the whole process so easy and enjoyable.",
    rating: 5,
    avatar: unsplash("photo-1494790108377-be9c29b29330", 200),
    image: unsplash("photo-1600210492486-724fe5c67fb0", 1400),
    imageAlt: "Warm living room with a cream sectional and large windows",
  },
  {
    id: "t2",
    name: "Daniel O.",
    role: "Apartment owner",
    quote:
      "We had a small space and big ideas. They made every corner work harder without making it feel crowded. Friends keep asking who designed it.",
    rating: 5,
    avatar: unsplash("photo-1507003211169-0a1dd7228f2d", 200),
    image: unsplash("photo-1502672260266-1c1ef2d93688", 1400),
    imageAlt: "Bright apartment living room with neutral furniture and plants",
  },
  {
    id: "t3",
    name: "Amara K.",
    role: "Villa owner",
    quote:
      "From the first call to the final styling, everything was on time and exactly as promised. The bedroom is now my favourite place in the world.",
    rating: 5,
    avatar: unsplash("photo-1438761681033-6461ffad8d80", 200),
    image: unsplash("photo-1616594039964-ae9021a400a0", 1400),
    imageAlt: "Sage green bedroom with warm lighting and layered bedding",
  },
];
