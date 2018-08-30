import api from "@/services/api";

export default {
  fetchPosts() {
    return api().get("posts");
  },

  addPost(params) {
    return api().post("posts", params);
  },

  getPost(id) {
    return api().get("posts/" + id);
  },

  updatePost(id, params) {
    return api().put("posts/" + id, params);
  },

  deletePost(id) {
    return api().delete("posts/" + id);
  }
};
