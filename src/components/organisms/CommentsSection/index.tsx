import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "@core/services/api";
import { VscChevronDown, VscComment } from "react-icons/vsc";
import CommentForm from "../CommentForm";
import Toaster from "@components/atoms/Toaster";
import { AppContext } from "@contexts/AppContext";
import UserAvatar from "@components/atoms/UserAvatar";
import { UserParams } from "@core/services/api/interfaces";

const CommentsSection = () => {
  const { dataById, commentsData, setCommentsData } = useContext(AppContext);
  const [users, setUsers] = useState<UserParams[]>([]);
  const [loadedComments, setLoadedComments] = useState(5);
  const lastComment = useRef<HTMLDivElement>(null);

  const handleDate = (date: string) =>
    new Date(date).toDateString().split(" ").slice(1).join(" ");

  useEffect(() => {
    api
      .findCommentsByClassId(Number(dataById?.id))
      .then((data) => setCommentsData && setCommentsData(data))
      .catch(() =>
        toast(
          <Toaster type="error">Unexpected error. Try again later.</Toaster>,
          {
            type: "error",
          }
        )
      );
  }, [dataById?.id, setCommentsData]);

  useEffect(() => {
    api.findUsers().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setLoadedComments(5);
  }, [dataById]);

  return (
    <>
      <CommentForm
        onSuccess={() =>
          lastComment.current?.scrollIntoView({ behavior: "smooth" })
        }
      />
      <div className="p-5 bg-gray-50 dark:bg-gray-800">
        {commentsData && commentsData.length > 0 ? (
          <div className="flex flex-col">
            <h3 className="font-light mb-4 flex items-center">
              <VscComment
                size={21}
                className="text-gray-500 mr-2 dark:text-gray-600"
              />
              {commentsData?.length} Comment
              {commentsData?.length > 1 && "s"}
            </h3>

            {commentsData
              ?.sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .slice(0, loadedComments)
              .map((comment, index) => {
                const userName = users?.find(
                  (user) => user.id === comment.userId
                )?.name;

                return (
                  <div
                    className="p-3 rounded mb-2 font-light border bg-gray-200 dark:bg-gray-900 dark:border dark:border-gray-600"
                    key={comment.id}
                    ref={index === 0 ? lastComment : null}
                  >
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">
                        {handleDate(comment.date)}
                      </span>
                      <div className="flex items-center">
                        <UserAvatar
                          size="sm"
                          userName={userName}
                          className="mr-2"
                        />
                        <span className="text-sm">{userName}</span>
                      </div>
                    </div>
                    <div className="dark:text-white">{comment.comment}</div>
                  </div>
                );
              })}
            {loadedComments < commentsData.length && (
              <button
                className="rounded p-2 flex items-center justify-center text-sm font-light transition duration-200 bg-gray-900 text-white dark:bg-gray-800 border dark:border dark:border-gray-600"
                onClick={() => setLoadedComments(loadedComments + 5)}
              >
                Load more comments...
                <VscChevronDown className="ml-2" size={18} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center py-3">
            <h3 className="font-light text-md flex items-center">
              <VscComment
                size={21}
                className="text-gray-500 mr-2 dark:text-gray-600"
              />
              There are no comments.
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentsSection;
