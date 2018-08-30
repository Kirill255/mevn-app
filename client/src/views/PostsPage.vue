<template>
  <div class="container d-flex justify-content-center">
    <div class="row">
      <div class="col-xs-12">
        <h1>Posts</h1>
        <h3>This file will list all the posts</h3>
        <hr>
        <section v-if="posts.length">
          <table class="table table-striped table-hover">
            <caption>List of posts</caption>
            <thead>
              <tr class="bg-primary">
                <th>Title</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts"
                  :key="index">
                <td>{{ post.title }}</td>
                <td>{{ post.description }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-primary"
                          type="button"
                          name="edit"
                          id="edit"
                          @click="goEdit(post._id)">Edit</button>
                  <button class="btn btn-sm btn-warning"
                          type="button"
                          name="delete"
                          id="delete"
                          @click="deletePost(post._id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section v-else>
          <p class="lead">There are no posts ... Lets add one now!</p>
        </section>
        <div>
          <router-link :to="{ name: 'NewPost' }">Add new post</router-link>
        </div>
        <div v-if="errors">
          <div class="mt-3">
            <div v-for="(error, index) in errors"
                 class="alert alert-danger"
                 :key="index">
              {{ error.msg }}
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
  name: "PostsPage",
  data() {
    return {
      posts: [],
      errors: []
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      // console.log("response :", response);
      this.posts = response.data;
    },
    goEdit(id) {
      this.$router.push({ name: "EditPost", params: { id: id } });
    },
    async deletePost(id) {
      const confirmed = confirm("Are you sure?");
      if (confirmed) {
        await PostsService.deletePost(id)
          .then(res => {
            // console.log("res ", res);
            // не работает, если нужно перейти с текущей страницы на текущую, грубо говоря перезагрузить
            // this.$router.push({ name: "Posts" });
            // this.$router.push({ path: "/posts" });

            // http://qaru.site/questions/843681/do-we-have-routerreload-with-vue-router
            // this.$router.go(this.$router.currentRoute);
            // или так
            // this.$router.go();
            // или просто подтянуть новые данные
            this.getPosts();
          })
          .catch(err => {
            // console.log("err :", err.response);
            this.errors = err.response.data.errors;
          });
      } else {
        return;
      }
    }
  }
};
</script>
<style>
table th,
table tr {
  text-align: left;
}
caption {
  caption-side: top;
}
</style>
