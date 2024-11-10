<template>
  <section>
    <header class="text-h4">
      
      <b>Our users</b>
      <img src="../assets/garland.png" :class="{'grayscale': grayscaled}" @click="makeGray" alt="">
    </header>

    <slot />

  </section>
</template>

<script>
export default {
	data() {
		return {
			grayscaled: false
		}
	},
  
	methods: {
		makeGray() {
			switch (this.grayscaled) {
			case true:
				this.grayscaled = false
				break
			case false:
				this.grayscaled = true
				break
			}
		}
	}
}
</script>

<style>
header {
  background-color: #C2B9FCA9;
  height: 70px;
  font-size: 26pt;
  display: flex;
  align-items: center;
  padding-left: 40px;
}

img {
  margin-bottom: 40px;
  width: 1640px;
  margin-left: 50px;
  z-index: 1;
  transition: 1s;
}

.grayscale {
  filter: grayscale(1);
  transition: 1s;
}
</style>
