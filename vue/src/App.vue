<template>
  <div class="file-upload">
    <input type="file" ref="fileInput" @change="uploadFile" />
    <p v-if="uploadedFileUrl">
      File uploaded successfully! Here is the URL: <a :href="uploadedFileUrl" target="_blank">{{ uploadedFileUrl }}</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFileUrl: null,
    };
  },
  methods: {
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.text())
        .then(data => {
          this.uploadedFileUrl = data;
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<style scoped>
.file-upload {
  text-align: center;
  margin-top: 20vh;
}
</style>
