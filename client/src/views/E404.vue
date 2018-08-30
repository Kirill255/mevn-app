<template>
  <div>
    <div class="content">
      <canvas class="snow"
              id="snow"
              ref="snow"></canvas>
      <div class="main-text">
        <div>Page not Found</div>
        <router-link :to="{name: 'home'}"
                     class="home-link">Go Home</router-link>
      </div>
      <div class="ground">
        <div class="mound">
          <div class="mound_text">404</div>
          <div class="mound_spade"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// взято отсюда
// https://codepen.io/nw/pen/WQmxYY
export default {
  name: "E404",
  mounted() {
    function makeSnow(el) {
      var ctx = el.getContext("2d");
      var width = 0;
      var height = 0;
      var particles = [];

      var Particle = function() {
        this.x = this.y = this.dx = this.dy = 0;
        this.reset();
      };

      Particle.prototype.reset = function() {
        this.y = Math.random() * height;
        this.x = Math.random() * width;
        this.dx = Math.random() * 1 - 0.5;
        this.dy = Math.random() * 0.5 + 0.5;
      };

      function createParticles(count) {
        if (count != particles.length) {
          particles = [];
          for (var i = 0; i < count; i++) {
            particles.push(new Particle());
          }
        }
      }

      function onResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        el.width = width;
        el.height = height;

        createParticles(width * height / 10000);
      }

      function updateParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#f6f9fa";

        particles.forEach(function(particle) {
          particle.y += particle.dy;
          particle.x += particle.dx;

          if (particle.y > height) {
            particle.y = 0;
          }

          if (particle.x > width) {
            particle.reset();
            particle.y = 0;
          }

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
          ctx.fill();
        });

        window.requestAnimationFrame(updateParticles);
      }

      onResize();
      updateParticles();

      window.addEventListener("resize", onResize);
    }

    var canvas = this.$refs.snow;
    makeSnow(canvas);
  }
};
</script>

<style scoped>
.content {
  font-family: "Dosis", sans-serif;
  font-size: 32px;
  font-weight: 500;

  height: 100%;
  min-height: 450px;

  overflow: hidden;

  position: relative;
  z-index: 1;

  background-color: #d2e1ec;
  background-image: linear-gradient(to bottom, #bbcfe1 0%, #e8f2f6 80%);
  color: #5d7399;
}

.snow {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;

  pointer-events: none;
}

.main-text {
  font-size: 5vh;
  line-height: 1.5em;

  padding: 20vh 20px 0 20px;

  text-align: center;
}

.home-link {
  font-size: 0.6em;
  font-weight: 400;

  border-bottom: 1px dashed rgba(93, 115, 153, 0.5);
  color: inherit;
  opacity: 0.6;
  text-decoration: none;
}

.home-link:hover {
  opacity: 1;
}

.ground {
  width: 100%;
  height: 160px;

  position: absolute;
  bottom: 0;
  left: 0;

  background: #f6f9fa;
  box-shadow: 0 0 10px 10px #f6f9fa;
}

.ground:before,
.ground:after {
  width: 250px;
  height: 250px;

  display: block;

  position: absolute;
  top: -62.5px;
  z-index: -1;

  background: transparent;
  content: "";
  -webkit-transform: scaleX(0.2) rotate(45deg);

  transform: scaleX(0.2) rotate(45deg);
}

.ground:after {
  margin-left: -166.6666666667px;

  left: 50%;

  box-shadow: -315px 285px 15px #8e9eba, -640px 560px 15px #94a3be,
    -940px 860px 15px #8a9bb8, -1190px 1210px 15px #b7c1d3,
    -1540px 1460px 15px #94a3be, -1765px 1835px 15px #b7c1d3,
    -2115px 2085px 15px #a7b4c9, -2350px 2450px 15px #b0bccf,
    -2725px 2675px 15px #b7c1d3, -2990px 3010px 15px #8798b6,
    -3260px 3340px 15px #94a3be, -3595px 3605px 15px #7e90b0,
    -3930px 3870px 15px #91a1bc, -4155px 4245px 15px #94a3be,
    -4535px 4465px 15px #aab6cb, -4765px 4835px 15px #9aa9c2;
}

.ground:before {
  margin-right: -166.6666666667px;

  right: 50%;

  box-shadow: 275px -325px 15px #a7b4c9, 605px -595px 15px #91a1bc,
    885px -915px 15px #94a3be, 1230px -1170px 15px #97a6c0,
    1475px -1525px 15px #8496b4, 1785px -1815px 15px #bac4d5,
    2085px -2115px 15px #adb9cd, 2360px -2440px 15px #b4bed1,
    2715px -2685px 15px #b4bed1, 2995px -3005px 15px #a4b1c8,
    3285px -3315px 15px #9dabc4, 3600px -3600px 15px #aab6cb,
    3865px -3935px 15px #8496b4, 4190px -4210px 15px #9aa9c2,
    4455px -4545px 15px #adb9cd, 4795px -4805px 15px #a4b1c8;
}

.mound {
  font-size: 180px;
  font-weight: 800;
  /* margin-top: -80px; */

  margin-top: -120px;

  color: #dd4040;
  pointer-events: none;
  text-align: center;
}

.mound:before {
  margin-left: -300px;
  width: 600px;
  height: 200px;

  display: block;

  position: absolute;
  top: 50px;
  left: 50%;
  z-index: 1;

  background-color: #e8f2f6;
  background-image: linear-gradient(to bottom, #dee8f1, #f6f9fa 60px);
  border-radius: 100%;
  content: "";
}

.mound:after {
  margin-left: -150px;
  width: 28px;
  height: 6px;

  display: block;

  position: absolute;
  top: 68px;
  left: 50%;
  z-index: 2;

  background: #dd4040;
  border-radius: 100%;
  box-shadow: -56px 12px 0 1px #dd4040, -126px 6px 0 2px #dd4040,
    -196px 24px 0 3px #dd4040;
  content: "";
  -webkit-transform: rotate(-15deg);

  transform: rotate(-15deg);
}

.mound_text {
  -webkit-transform: rotate(6deg);

  transform: rotate(6deg);
}

.mound_spade {
  margin-right: -250px;
  width: 35px;
  height: 30px;

  display: block;

  position: absolute;
  top: 42%;
  right: 50%;
  z-index: 0;

  background: #dd4040;
  -webkit-transform: rotate(35deg);

  transform: rotate(35deg);
}

.mound_spade:before,
.mound_spade:after {
  display: block;

  position: absolute;

  content: "";
}

.mound_spade:before {
  margin-left: -20%;
  width: 40%;
  height: 30px;

  bottom: 98%;
  left: 50%;

  background: #dd4040;
}

.mound_spade:after {
  width: 100%;
  height: 30px;
  box-sizing: border-box;

  top: -55px;
  left: 0;

  border: 10px solid #dd4040;
  border-radius: 4px 4px 20px 20px;
}
</style>
