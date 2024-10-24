<template>
  <form @submit.prevent="handleSubmit">
    <div class="section_form">
      <h2>الصور المطلوبة</h2>
      <div class="form_container">
        <div class="upload">
          <img
            src="../../assets/Image/defaultuser.png"
            width="100"
            height="100"
            id="profileImagePreview"
            alt=""
          />
          <div class="round">
            <input
              type="file"
              name="file"
              id="profileImage"
              accept="image/*"
              @change="onFileChange"
            />
            <font-awesome-icon :icon="['fas', 'camera']" style="color: #fff" />
          </div>
        </div>
        <div class="input_wrap">
          <label for="origin_roomcardfront">صورة هوية غرفة التجارة امامية</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="origin_roomcardfront"
            class="input"
            id="origin_roomcardfront"
            @change="handleFileChange($event, 'origin_roomcardfront')"
          />
        </div>
        <div class="input_wrap">
          <label for="origin_roomcardback">صورة هوية غرفة التجارة خلفية</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="origin_roomcardback"
            class="input"
            id="origin_roomcardback"
            @change="handleFileChange($event, 'origin_roomcardback')"
          />
        </div>
        <div class="input_wrap">
          <label for="housing_cardfront">صورة بطاقة السكن امامية</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="housing_cardfront"
            class="input"
            id="housing_cardfront"
            @change="handleFileChange($event, 'housing_cardfront')"
          />
        </div>
        <div class="input_wrap">
          <label for="housing_cardback">صورة بطاقة السكن خلفية</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="housing_cardback"
            class="input"
            id="housing_cardback"
            @change="handleFileChange($event, 'housing_cardback')"
          />
        </div>
      </div>
    </div>
    <div class="btn_wrapper">
      <button type="submit" class="next_btn" :disabled="loading">
        <span v-if="loading" class="spinner"></span>
        <span v-else>التالي</span>
      </button>
      <button type="button" class="back_btn" @click="$emit('prev-step')">السابق</button>
    </div>
  </form>
</template>

<script>
import {axiosUpload} from '../../axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ImageForm",
  data() {
    return {
      profileImage: null,
      profileUrlImage: '',
      images: {
        origin_roomcardfront: null,
        origin_roomcardback: null,
        housing_cardfront: null,
        housing_cardback: null,
      },
      imagesPdf: '',
      loading: false,
    };
  },
  methods: {
    displaySelectedImage(event, imgId) {
      const fileInput = event.target;
      const imgElement = document.getElementById(imgId);
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imgElement.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    },
    onFileChange(event) {
      this.profileImage = event.target.files[0];
      this.displaySelectedImage(event, 'profileImagePreview');
    },
    handleFileChange(event, imageType) {
      this.images[imageType] = event.target.files[0];
    },
    async uploadProfileImage() {
      if (!this.profileImage) {
        toast.warning('الرجاء قم بتحميل الصوررة الشخصية');
        return;
      }
      const formData = new FormData();
      formData.append('RemoteFile', this.profileImage);
      formData.append('Directory','TajerPhotos');
      try {
        const response = await axiosUpload.post('/File/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.profileUrlImage = response.data.path;
      } catch (error) {
        toast.error('خطأ في تحميل الصور');
      }
    },
    async uploadOtherImages() {
      const requiredFields = [
        'origin_roomcardfront',
        'origin_roomcardback',
        'housing_cardfront',
        'housing_cardback'
      ];

      for (const field of requiredFields) {
        if (!this.images[field]) {
          toast.warning(`الرجاء قم بتحميل جميع الصور`);
          return;
        }
      }

      const formData = new FormData();
      Object.keys(this.images).forEach(key => {
        if (this.images[key]) {
          formData.append('files', this.images[key]);
        }
      });
      formData.append('Directory','PdfFiles');

      try {
        const response = await axiosUpload.post('/File/pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.imagesPdf = response.data;
        toast.success('تم تحميل جميع الصور بنجاح');
      } catch (error) {
        console.error('Error uploading other images', error);
        toast.error('Error uploading other images');
      }
    },
    async handleSubmit() {
      this.loading = true;
      await this.uploadProfileImage();
      await this.uploadOtherImages();

      if (this.profileUrlImage && this.imagesPdf) {
        this.$emit('update-data', {
          Image: this.profileUrlImage,
          Documents: this.imagesPdf,
        });
        this.$emit('next-step');
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import "../../assets/Css/SignUp.css";

.btn {
  position: relative;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.buttonText {
  display: inline-block;
}

.loading .spinner {
  display: inline-block;
}

.loading .buttonText {
  display: none;
}

/* Start Circle img */
.upload {
  width: 100px;
  position: relative;
  margin: auto;
}

.upload img {
  border-radius: 50%;
  border: 4px solid #eaeaea;
}

.upload .round {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #0062c3;
  width: 32px;
  height: 32px;
  line-height: 35px;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
}

.upload .round input[type="file"] {
  position: absolute;
  transform: scale(2);
  opacity: 0;
}

input[type="file"]::-webkit-file-upload-button {
  cursor: pointer;
}
/* End Circle img */
</style>