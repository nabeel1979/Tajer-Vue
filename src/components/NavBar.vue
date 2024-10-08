<template>
  <div class="navbar_container">
    <nav>
      <input type="checkbox" id="show-menu" />
      <label for="show-menu" class="menu-icon"
        ><font-awesome-icon :icon="['fas', 'bars']"
      /></label>
      <div class="content">
        <div class="links_container">
          <ul class="links">
            <li>
              <router-link to="/" @click="closeMenu"
                >الصفحة الرئيسية</router-link
              >
            </li>
            <li>
              <a href="#" class="desktop-link"
                ><font-awesome-icon :icon="['fas', 'globe']" />
                المعاملات الالكترونية
                <i
                  class="fa-solid fa-angle-left"
                  style="color: #ffffff; font-size: 16px; margin-right: 5px"
                ></i
              ></a>
              <input type="checkbox" id="show-daily" />
              <label for="show-daily"
                >المعاملات الالكترونية
                <i
                  class="fa-solid fa-angle-down"
                  style="color: #ffffff; font-size: 16px; margin-right: 5px"
                ></i
              ></label>
              <ul>
                <li>
                  <a href="#" class="desktop-link">
                    طلب معاملة
                    <i
                      class="fa-solid fa-angle-left"
                      style="color: #ffffff; font-size: 16px; margin-right: 5px"
                    ></i
                  ></a>
                  <input type="checkbox" id="show-origin" />
                  <label for="show-origin">
                    طلب معاملة
                    <i
                      class="fa-solid fa-angle-down"
                      style="color: #ffffff; font-size: 16px; margin-right: 5px"
                    ></i
                  ></label>
                  <ul>
                    <li>
                      <router-link to="/origincertificate" @click="closeMenu"
                        >شهادة المنشأ</router-link
                      >
                    </li>
                  </ul>
                </li>
                <li>
                      <router-link to="/transactions" @click="closeMenu"
                        >معاملاتي</router-link
                      >
                    </li>
              </ul>
            </li>
            <li>
              <a href="https://bcc.iq/" target="_blank"
                ><font-awesome-icon :icon="['fas', 'phone']" /> اتصل بنا</a
              >
            </li>
            <li>
              <a href="#" class="desktop-link"
                ><font-awesome-icon :icon="['fas', 'gear']"
              /></a>
              <input type="checkbox" id="show-lang" />
              <label for="show-lang"
                ><font-awesome-icon :icon="['fas', 'gear']"
              /></label>
              <ul>
                <li>
                  <a href="">الملف الشخصي</a>
                </li>
                <li><router-link to="/edit-password">تغيير كلمة المرور</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="items">
        <span class="logout_btn">
          <router-link @click="signOut" to="/login"
            >تسجيل الخروج <font-awesome-icon :icon="['fas', 'power-off']"
          /></router-link>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    signOut() {
      localStorage.removeItem("Token");
    },
    closeMenu() {
      const checkbox = document.getElementById("show-menu");
      if (checkbox) {
        checkbox.checked = false;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
@import "../assets/Css/NavBar.css";
</style>
