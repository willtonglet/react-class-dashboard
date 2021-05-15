import {
  CheckedParams,
  ClassParams,
  CommentParams,
  CourseParams,
  RatingParams,
  UserParams,
} from "./interfaces";

const baseURL = "http://localhost:5000";
const headers = new Headers({ "Content-Type": "application/json" });

const api = {
  async findCourseById(id: string) {
    return new Promise<CourseParams>((resolve, reject) => {
      fetch(`${baseURL}/courses/${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findClass() {
    return new Promise<ClassParams[]>((resolve, reject) => {
      fetch(`${baseURL}/classes`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findLastViewedClass() {
    return new Promise<ClassParams[]>((resolve, reject) => {
      fetch(`${baseURL}/classes`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findClassById(id: string) {
    return new Promise<ClassParams>((resolve, reject) => {
      fetch(`${baseURL}/classes/${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findClassByCourseId(id: string) {
    return new Promise<ClassParams[]>((resolve, reject) => {
      fetch(`${baseURL}/classes?courseId=${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findClassIdByCourseId(idCourse: string, idClass: string) {
    return new Promise<ClassParams>((resolve, reject) => {
      fetch(`${baseURL}/classes?courseId=${idCourse}&id=${idClass}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res[0]));
        })
        .catch(reject);
    });
  },

  async updateClass(data: ClassParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/classes/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async findUsers() {
    return new Promise<UserParams[]>((resolve, reject) => {
      fetch(`${baseURL}/users`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async findUserById(id: number) {
    return new Promise<UserParams>((resolve, reject) => {
      fetch(`${baseURL}/users/${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async updateUser(data: UserParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/users/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async findRatingByUserId(id: number) {
    return new Promise<RatingParams[]>((resolve, reject) => {
      fetch(`${baseURL}/classesRating?userId=${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async postClassRating(data: RatingParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/classesRating`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async updateClassRating(data: RatingParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/classesRating/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async findCheckedByCourseIdAndUserId(courseId: number, userId: number) {
    return new Promise<CheckedParams[]>((resolve, reject) => {
      fetch(`${baseURL}/checkedClasses?courseId=${courseId}&userId=${userId}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async updateCheckedClass(data: CheckedParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/checkedClasses/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok && response.status === 200) {
            resolve(true);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  async findCommentsByClassId(id: number) {
    return new Promise<CommentParams[]>((resolve, reject) => {
      fetch(`${baseURL}/comments?classId=${id}`, {
        method: "GET",
        headers,
      })
        .then((response) => {
          response.json().then((res) => resolve(res));
        })
        .catch(reject);
    });
  },

  async postComment(data: CommentParams): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fetch(`${baseURL}/comments`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
        headers,
      })
        .then((response) => {
          if (response.ok) resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default api;
