import React, { useEffect, useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { useParams } from "react-router";
import api from "@core/services/api";
import { RatingParams } from "@core/services/api/interfaces";

interface RatingProps {
  size?: number;
}

const Rating = (props: RatingProps) => {
  const { size = 18 } = props;
  const [rating, setRating] = useState<number>();
  const [ratingData, setRatingData] = useState<RatingParams>();
  const { idClass } = useParams<{ idClass?: string }>();

  const ratingToggle = (index: number) =>
    index + 1 === rating ? rating - 1 : index + 1;

  const handleIconActive = (index: number) =>
    rating && rating >= index + 1 ? (
      <BsStarFill className="fill-current text-yellow-500" size={size} />
    ) : (
      <BsStar className="fill-current text-gray-600" size={size} />
    );

  const handleRatingClick = (rt: number) => {
    const body = {
      classId: Number(idClass),
      userId: 1,
      rating: rt,
    };

    if (rating) {
      api.updateClassRating({ ...body, id: ratingData?.id });
    } else {
      api.postClassRating(body);
    }
  };

  useEffect(() => {
    api.findRatingByUserId(1).then((data) => {
      const userDataByClassId = data.find(
        (item) => item.classId === Number(idClass)
      );
      setRatingData(userDataByClassId);
      setRating(userDataByClassId?.rating);
    });
  }, [idClass, rating]);

  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setRating(ratingToggle(index));
              handleRatingClick(ratingToggle(index));
            }}
            className="mr-1 focus:outline-none"
          >
            {handleIconActive(index)}
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
