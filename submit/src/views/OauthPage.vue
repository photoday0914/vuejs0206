<script>
import axios from "axios";
// import { reactive } from "vue";

export default {
  data() {
    return {      
     
    };
  },

  mounted() {

  },

  methods : {
    login() {
      const args = {
        // loginId: state.form.loginId,
        email: this.form.loginEmail,
      };

      axios
        .get("http://localhost:3000/api/auth/callback", args)
        .then((res) => {
          alert("Logged in successfully");
          this.account = res.data;
        })
        .catch(() => {
          alert("Failed to log in. Confirm account info.");
        });
    },

    register() {
      const args = {
        // loginId: state.form.loginId,
        email: this.form.loginEmail,
      };

      axios
        .post("http://localhost:3000/api/auth/signup", args)
        .then((res) => {
          alert("registered in successfully");
          this.account = res.data;
        })
        .catch(() => {
          alert("Failed to register. Confirm account info.");
        });
    },

    logout() {
      axios.delete("/api/account").then(() => {
        alert("Logged out.");
        this.account.id = null;
        this.account.name = "";
      });
    }
  } 
  
};
</script>
