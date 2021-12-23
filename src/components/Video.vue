<template>
    <Img v-if="isStarted" crossOrigin="anonymous" 
        src="http://pendelcam.kip.uni-heidelberg.de/mjpg/video.mjpg"
        >
        
        </Img>

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