<template>
  <div class="container d-flex justify-content-center">
    <div class="row">
      <div class="col-xs-12">
        <h1>Add New Post</h1>
        <form @submit.prevent="addPost">
          <div class="form-group">
            <input class="form-control"
                   type="text"
                   name="title"
                   id="title"
                   placeholder="Title"
                   v-model.trim="post.title" />
          </div>
          <div class="form-group">
            <textarea class="form-control"
                      type="text"
                      rows="5"
                      name="description"
                      id="description"
                      placeholder="Description"
                      v-model.trim="post.description"></textarea>
          </div>
          <div class="form-group">
            <button class="btn btn-block btn-primary"
                    type="submit"
                    name="addPost"
                    id="addPost">Add new post</button>
          </div>
          <section>
            <button class="btn btn-success btn-block"
                    type="button"
                    @click="goBack">Go to posts page</button>
          </section>
        </form>

        <div v-if="errors">
          <div class="mt-3">
            <div v-for="(error, index) in errors"
                 class="alert alert-danger"
                 :key="index">
              {{ error.name }} {{ error.msg || error.errmsg }}
            </div>
          </div>
        </div>
        <!-- <pre>
        {{ errors }}
        </pre> -->
      </div>
    </div>
  </div>
</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  name: "NewPostPage",
  data() {
    return {
      post: {
        title: "",
        description: ""
      },
      errors: []
    };
  },
  methods: {
    async addPost() {
      if (this.post.title !== "" && this.post.description !== "") {
        await PostsService.addPost({
          title: this.post.title,
          description: this.post.description
        })
          .then(res => {
            // console.log("res ", res);
            this.$router.push({ name: "Posts" });
          })
          .catch(err => {
            // console.log("err :", err.response);
            this.errors = err.response.data.errors;
          });
      } else {
        alert("Empty fields!");
      }
    },
    goBack() {
      this.$router.push({ name: "Posts" });
    }
  }
};
</script>

<style scoped>
</style>

/*
тэг pre в коде - для отладки
*/
