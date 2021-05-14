import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { VscChevronRight, VscRefresh } from "react-icons/vsc";
import { toast } from "react-toastify";
import Vimeo from "@u-wave/react-vimeo";
import Rating from "@components/atoms/Rating";
import api from "@core/services/api";
import Toaster from "@components/atoms/Toaster";
import { AppContext } from "@contexts/AppContext";
import { StyledVideo } from "./styles";
import { CheckedParams } from "@core/services/api/interfaces";

const VideoFrame = () => {
  const { data, dataById } = useContext(AppContext);
  const [hasEnded, setHasEnded] = useState(false);
  const { checkedClasses, setCheckedClasses } = useContext(AppContext);
  const videoRef = useRef<HTMLDivElement>(null);
  const { idCourse } = useParams<{ idCourse?: string }>();
  const { idClass } = useParams<{ idClass?: string }>();
  const history = useHistory();

  const handleVideoEnded = () => {
    setHasEnded(true);
    handlePostChecked(true);
  };

  const currentCourseData = data?.filter(
    (bt) => bt.courseId === Number(idCourse)
  );

  const nextClass = currentCourseData?.find(
    (bt) => bt.order === Number(dataById?.order) + 1
  );

  const currentCheckedClass = checkedClasses?.find(
    (item) => item.classId === Number(idClass)
  );

  const handlePostChecked = (check: boolean) => {
    const body = {
      id: currentCheckedClass?.id,
      classId: currentCheckedClass?.classId,
      courseId: currentCheckedClass?.courseId,
      userId: currentCheckedClass?.userId,
      checked: check,
    };

    check &&
      toast(<Toaster type="success">Aula Concluída!</Toaster>, {
        type: "success",
      });

    api
      .updateCheckedClass(body as CheckedParams)
      .then(() =>
        api
          .findCheckedByCourseIdAndUserId(Number(idCourse), 1)
          .then((data) => setCheckedClasses && setCheckedClasses(data))
      );
  };

  const handleIsChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePostChecked(e.target.checked);
  };

  useEffect(() => {
    setHasEnded(false);
  }, []);

  return (
    <>
      <div
        className={`bg-black w-full flex flex-1 justify-center text-white ${
          !hasEnded && "hidden"
        }`}
        style={{
          height: `${videoRef.current?.getBoundingClientRect().height}px`,
        }}
      >
        <div className="flex flex-col justify-center items-center">
          <span className="text-xl font-light mb-2">Avalie esta aula:</span>
          <Rating size={32} />
          {nextClass && (
            <div className="flex mt-8">
              <button
                onClick={() => setHasEnded(false)}
                className="font-light py-2 px-5 border border-gray-700 rounded-md mr-2 flex items-center text-white"
              >
                <VscRefresh className="mr-2" />
                Assistir Novamente
              </button>
              <button
                onClick={() =>
                  history.push(`/${nextClass.courseId}/${nextClass.id}`)
                }
                className="font-light py-2 px-5 border border-gray-700 rounded-md flex items-center text-white"
              >
                Ir para a próxima aula
                <VscChevronRight className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>

      {dataById?.video && !hasEnded && (
        <StyledVideo
          ref={videoRef}
          className={`bg-black w-full flex flex-1 xl:px-32 justify-center`}
        >
          <Vimeo video={dataById.video} onEnd={handleVideoEnded} />
        </StyledVideo>
      )}

      <div
        className={`bg-black w-full flex flex-1 p-4 justify-${
          hasEnded ? "end" : "between"
        } border-t bg-gray-900 border-b border-gray-700 text-white`}
      >
        {!hasEnded && (
          <div className="flex items-center">
            <span className="font-light text-sm mr-2">Avalie esta aula:</span>
            <Rating />
          </div>
        )}
        <label
          role="button"
          htmlFor="checkClassBtn"
          className="flex items-center py-2 px-3 border bg-gray-800 border-gray-700 rounded-md"
        >
          <input
            type="checkbox"
            id="checkClassBtn"
            checked={currentCheckedClass?.checked}
            onChange={handleIsChecked}
            className="rounded mr-3"
          />
          <span className="font-light text-sm">Marcar aula como concluída</span>
        </label>
      </div>
    </>
  );
};

export default VideoFrame;
