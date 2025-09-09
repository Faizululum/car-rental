import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "I've been using Car Rental for the past year and I can say that I am extremely satisfied with the service. The staff is very friendly and helpful, and the cars are well-maintained. I highly recommend Car Rental to anyone looking for a luxury car rental experience.",
    },
    {
      name: "John Doe",
      address: "New York, USA",
      image:
        assets.testimonial_image_2,
      rating: 4,
      testimonial:
        "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!",
    },
    {
      name: "Sarah Lee",
      address: "London, UK",
      image:
        assets.testimonial_image_1,
      rating: 4,
      testimonial:
        "I was very impressed with the quality of the cars and the service. The staff was very helpful and responsive, and the prices were reasonable. I would definitely recommend Car Rental to anyone looking for a luxury car rental experience.",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose Car Rental for their luxury accommodations arround the world."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                    <img src={assets.star_icon} alt="star icon" key={index} />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
