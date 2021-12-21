<template>
    <iframe
          
          v-if="isStarted"
          width="420"
          height="315"
          src="http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg"
        >
        </iframe>

</template>

<script>

export default{
    name:"Video",
    props:{
        isStarted: {
            type:Boolean,
            required:true,
        }
    }
}

</script>