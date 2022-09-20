import { useMutation } from 'react-query';
import { AlarmAPI, CommentAPI, LikeAPI, ReplyAPI, UserAPI } from '@api/api';
import { useQueryClient } from 'react-query';

export const useAddUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.addUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });
};

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.createComment(form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useUpdateComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => CommentAPI.updateComment(commentId, form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useDeleteComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => CommentAPI.deleteComment(commentId), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useAddReply = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => ReplyAPI.createReply(form), {
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
    },
  });
};

export const useUpdateReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => ReplyAPI.updateReply(replyId, form), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useDeleteReply = (postId: number, replyId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => ReplyAPI.deleteReply(replyId), {
    onSuccess: () => queryClient.invalidateQueries(['post', postId]),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((form: any) => UserAPI.updateUserInfo(form), {
    onSuccess: () => queryClient.invalidateQueries('user'),
  });
};

export const useUpdateLike = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation((postId: any) => LikeAPI.postLike(postId), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      queryClient.invalidateQueries(['post', postId]);
      queryClient.invalidateQueries(['like', postId]);
    },
  });
};

export const useUpdateAlarm = (notificationId: string) => {
  const queryClient = useQueryClient();
  return useMutation(() => AlarmAPI.updateAlarm(notificationId), {
    onSuccess: () => queryClient.invalidateQueries('alarms'),
  });
};
