<template>
    <div class="expire_container">
        <div v-if="isActive" class="not_expire">
        <p>تاريخ انتهاء الهوية</p>
        <h5>{{ ExpireDate }}</h5>
        <p>تنتهي بعد</p>
        <h3>{{ expireMonths }} شهر و {{ expireDays }} يوم</h3>
      </div>
      <div v-else class="expire">
        <p>الهوية منتهية الصلاحية</p>
      </div>
    </div>
  </template>
  
  <script>
  import dayjs from "dayjs";
import { axiosInstance } from "../../axios";
  export default {
    name: 'ExpireUser',
    data() {
      return {
        expireDate: '',
        expireMonths: 0,
        expireDays: 0,
        isActive: null
      };
    },
    created() {
      this.GetUserExpire();
    },
    computed:{
        ExpireDate() {
      return dayjs(this.expireDate).format("YYYY-MM-DD");
    },
    },
    mounted() {
      // Get the current year and set the expiration date to December 31 of the current year
      const currentYear = new Date().getFullYear();
      const targetDate = new Date(`${currentYear}-12-31`);
  
      this.expireDate = targetDate.toLocaleDateString(); // Format date as DD/MM/YYYY
  
      // Update the countdown every second
      this.updateCountdown(targetDate);
      setInterval(() => {
        this.updateCountdown(targetDate);
      }, 1000);
    },
    methods: {
        async GetUserExpire(){
            const response = await axiosInstance.get("/home/home-data", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        this.isActive = response.data.IsTajerActive
        },
      updateCountdown(targetDate) {
        const now = new Date();
        const timeDiff = targetDate - now;
  
        if (timeDiff <= 0) {
          this.isExpired = true;
          this.expireMonths = 0;
          this.expireDays = 0;
        } else {
          this.calculateRemainingMonthsAndDays(now, targetDate);
        }
      },
      calculateRemainingMonthsAndDays(now, targetDate) {
        let months = (targetDate.getFullYear() - now.getFullYear()) * 12;
        months -= now.getMonth() + 1;
        months += targetDate.getMonth() + 1;
  
        // Calculate days
        let days = targetDate.getDate() - now.getDate();
  
        if (days < 0) {
          months--;
          // Get the number of days in the previous month
          const prevMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          days += prevMonth;
        }
  
        this.expireMonths = months;
        this.expireDays = days;
      }
    }
  };
  </script>
  
  <style>
.expire_container {
    text-align: center;
    padding: 25px 15px;
    box-shadow: 0 0 10px 1px rgb(195, 195, 195);
    border-radius: 15px;
}

.expire_container .expire p{
    font-size: 24px;
    color: red;
    margin: 0;
    font-weight: 700;
}

.expire_container .not_expire h5{
    color: blue;
}
</style>