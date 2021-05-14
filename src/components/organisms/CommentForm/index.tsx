import React, { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import api from "@core/services/api";
import Toaster from "@components/atoms/Toaster";
import UserAvatar from "@components/atoms/UserAvatar";
import { AppContext } from "@contexts/AppContext";

interface CommentFormProps {
  onSuccess?: () => void;
}

const CommentForm = (props: CommentFormProps) => {
  const { onSuccess } = props;
  const [comment, setComment] = useState("");
  const inputCommentRef = useRef<HTMLInputElement>(null);
  const { dataById, userData, setCommentsData } = useContext(AppContext);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      userId: Number(userData?.id),
      classId: Number(dataById?.id),
      comment: comment,
      date: new Date().toString(),
    };

    comment &&
      api
        .postComment(body)
        .then(() => {
          onSuccess && onSuccess();
          setComment("");
          api
            .findCommentsByClassId(Number(dataById?.id))
            .then((data) => setCommentsData && setCommentsData(data))
            .catch(() =>
              toast(
                <Toaster type="error">
                  Erro inesperado. Tente novamente mais tarde"
                </Toaster>,
                {
                  type: "error",
                }
              )
            );

          toast(
            <Toaster type="success">Comentário enviado com sucesso!</Toaster>,
            {
              type: "success",
            }
          );
        })
        .catch(() =>
          toast(
            <Toaster type="error">
              Erro inesperado. Tente novamente mais tarde"
            </Toaster>,
            {
              type: "error",
            }
          )
        );
  };

  return (
    <div className="border-t p-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmitComment} className="flex items-center">
        <UserAvatar userName={userData?.name} className="mr-3" />
        <input
          type="text"
          className="rounded flex-1 border-gray-400 font-light dark:bg-gray-900 dark:border-gray-600"
          placeholder="Digite o seu comentário..."
          ref={inputCommentRef}
          value={comment}
          onChange={(val) => setComment(val.target.value)}
        />
      </form>
    </div>
  );
};

export default CommentForm;
