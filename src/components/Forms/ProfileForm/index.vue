<template>
 <form class="profile-form" @submit.prevent>
   <BaseAvatar :image="avatar" edit @upload="uploadAvatarPreview" @remove="removeAvatarPreview"/>
   <BaseDatePicker v-model="dob" label="Дата рождения" />
   <BaseInput
       v-model="name"
       label="Имя"
       placeholder="Укажите имя"
       required
       :error="nameError"
       :error-text="nameErrorText"
   />
   <BaseInput
       v-model="surname"
       label="Фамилия"
       placeholder="Укажите фамилию"
       required
       :error="surnameError"
       :error-text="surnameErrorText"
   />
   <BaseInput v-model="patronymic" label="Отчество" placeholder="Укажите отчество" />
   <BaseSelect v-model="selectedLanguages" label="Языки" :options="languages" placeholder="Выберите язык" multiple />
   <BaseInput v-model="city" label="Город" placeholder="Укажите город" />
   <BaseInput v-model="phone" type="phone" label="Номер телефона" placeholder="Укажите номер телефона" class="profile-form__phone" />
   <BaseInput
       v-model="email"
       label="Электронная почта"
       placeholder="Укажите электронную почту"
       required
       :error="emailError"
       :error-text="emailErrorText"
   />
   <div  v-if="!user" class="profile-form__password profile-form__password--create">
     <BaseInput
         v-model="createdPassword"
         type="password" label="Пароль"
         placeholder="Придумайте пароль"
         autocomplete="new-password"
         required
         :error="createdPasswordError"
         :error-text="createdPasswordErrorText"
     />
     <BaseInput
         v-model="confirmCreatedPassword"
         type="password"
         label="Подтверждение пароля"
         placeholder="Повторите пароль"
         required
         :error="confirmCreatedPasswordError"
         :error-text="confirmCreatedPasswordErrorText"
     />
   </div>
   <div v-else class="profile-form__password profile-form__password--edit">
     <div v-if="editPasswordIsOpen" class="profile-form__password--edit__controls">
       <h2>Изминение пароля</h2>
       <BaseInput
           v-model="oldPassword"
           type="password"
           label="Пароль"
           placeholder="Введите старый пароль"
           autocomplete="new-password"
           required
           :error="oldPasswordError"
           :error-text="oldPasswordErrorText"
       />
       <BaseInput
           v-model="newPassword"
           type="password"
           label="Новый пароль"
           placeholder="Введите новый пароль"
           autocomplete="new-password"
           required
           :error="newPasswordError"
           :error-text="newPasswordErrorText"
       />
       <BaseInput
           v-model="confirmNewPassword"
           type="password"
           label="Подтверждение нового пароля"
           placeholder="Повторите новый пароль"
           required
           :error="confirmNewPasswordError"
           :error-text="confirmNewPasswordErrorText"
       />
     </div>
     <BaseBtn
         :label=passwordEditBtnLabel
         color="primary" outline
         class="profile-form__password--edit__btn"
         @click="switchPasswordEdit"
     />
   </div>
   <div class="profile-form__buttons">
     <BaseBtn label="Сохранить" color="primary" @click="sendForm" />
     <BaseBtn label="Отмена" color="primary" @click="cancel" />
   </div>
 </form>
</template>

<script>
import BaseInput from "@/components/UI/BaseInput";
import BaseBtn from "@/components/UI/BaseBtn";
import {mapGetters, mapMutations} from "vuex";
import BaseFileUploader from "@/components/UI/BaseFileUploader";
import BaseAvatar from "@/components/UI/BaseAvatar";
import BaseSelect from "@/components/UI/BaseSelect";
import BaseDatePicker from "@/components/UI/BaseDatePicker";
import { useVuelidate } from '@vuelidate/core';
import {required, email, minLength, sameAs} from '@vuelidate/validators';
import {
  createProfile,
  createUser,
  loginUser,
  removeImage,
  saveImage,
  updateEmail,
  updatePassword,
  updateProfile
} from "@/api";
import {languages} from "@/api/composables/lamguages";
import {phoneCodes} from "@/api/composables/phoneCodes";

export default {
  name: "ProfileForm",
  components: { BaseDatePicker, BaseSelect, BaseAvatar, BaseFileUploader, BaseBtn, BaseInput},
  props: {
    user: {
      type: [ Object, null ],
      default: null
    }
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      createdPassword: '',
      confirmCreatedPassword: '',
      selectedLanguages: this.user?.languages || '',
      avatar: this.user?.avatar || null,
      addedAvatar: null,
      removedAvatar: null,
      name: this.user?.name || '',
      surname: this.user?.surname || '',
      patronymic: this.user?.patronymic || '',
      dob: this.user?.dob || '',
      email: this.user?.email || '',
      city: this.user?.city || '',
      phone: this.user?.phone || '',
      editPasswordIsOpen: false,
      errors: {
        oldPassword: false,
        confirmNewPassword: false,
        confirmCreatedPassword: false,
        emailError: false
      }
    }
  },
  setup() {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      name: { required, $autoDirty: true },
      surname: { required, $autoDirty: true },
      email: { required, $autoDirty: true, email },
      createdPassword: !this.user ? { required, $autoDirty: true, minLength: minLength(6) } : true,
      oldPassword: this.editPasswordIsOpen ? { required, $autoDirty: true, minLength: minLength(6), sameAsPassword: sameAs(this.user.password) } : true,
      newPassword: this.editPasswordIsOpen ? { required, $autoDirty: true, minLength: minLength(6) } : true,
      confirmCreatedPassword: !this.user ? {required, sameAsPassword: sameAs(this.createdPassword)} : true,
      confirmNewPassword: this.editPasswordIsOpen ? {required, sameAsPassword: sameAs(this.newPassword)} : true,

    }
  },
  computed: {
    ...mapGetters({
      userUid: "userUid",
      key: "key"
    }),
    languages() {
      return languages
    },
    phoneCodes() {
      return phoneCodes
    },
    createdPasswordError() {
      if(!this.v$.createdPassword.$dirty) return false;
      return this.v$.createdPassword.required.$invalid || this.v$.createdPassword.minLength.$invalid || this.errors.confirmCreatedPassword;
    },
   oldPasswordError() {
      if(!this.v$.oldPassword.$dirty) return false;
      return this.v$.oldPassword.required.$invalid || this.v$.oldPassword.minLength.$invalid || this.errors.oldPassword;
    },
    newPasswordError() {
      if(!this.v$.newPassword.$dirty) return false;
      return this.v$.newPassword.required.$invalid || this.v$.newPassword.minLength.$invalid || this.errors.confirmNewPassword;
    },
    confirmNewPasswordError() {
      if(!this.v$.newPassword.$dirty) return false;
      return this.v$.confirmNewPassword.required.$invalid && this.v$.confirmNewPassword.$dirty || this.errors.confirmNewPassword;
    },
    confirmCreatedPasswordError() {
      if(!this.v$.createdPassword.$dirty) return false;
      return this.v$.confirmCreatedPassword.required.$invalid && this.v$.confirmCreatedPassword.$dirty || this.errors.confirmCreatedPassword;
    },
    nameError() {
      if(!this.v$.name.$dirty) return false;
      return this.v$.name.required.$invalid;
    },
    surnameError() {
      if(!this.v$.surname.$dirty) return false;
      return this.v$.surname.required.$invalid;
    },
    emailError() {
      if(!this.v$.email.$dirty) return false;
      return this.v$.email.required.$invalid || this.v$.email.email.$invalid || this.errors.emailError;
    },
    createdPasswordErrorText() {
      switch (true) {
        case this.v$.createdPassword.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.createdPassword.minLength.$invalid:
          return 'Пароль должен содержать минимум 6 символов';
        case this.errors.confirmCreatedPassword:
          return 'Пароли не совпадают';
      }
    },
    oldPasswordErrorText() {
      switch (true) {
        case this.v$.oldPassword.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.oldPassword.minLength.$invalid:
          return 'Пароль должен содержать минимум 6 символов';
        case this.errors.oldPassword:
          return 'Пароли не совпадают';
      }
    },
    newPasswordErrorText() {
      switch (true) {
        case this.v$.newPassword.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.newPassword.minLength.$invalid:
          return 'Пароль должен содержать минимум 6 символов';
        case this.errors.confirmNewPassword:
          return 'Пароли не совпадают';
      }
    },
    confirmNewPasswordErrorText() {
      switch (true) {
        case this.v$.confirmNewPassword.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.errors.confirmNewPassword:
          return 'Пароли не совпадают';
      }
    },
    confirmCreatedPasswordErrorText() {
      switch (true) {
        case this.v$.confirmCreatedPassword.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.errors.confirmCreatedPassword:
          return 'Пароли не совпадают';
      }
    },
    nameErrorText() {
      switch (true) {
        case this.v$.name.required.$invalid:
          return 'Поле не должно быть пустым';
      }
    },
    surnameErrorText() {
      switch (true) {
        case this.v$.surname.required.$invalid:
          return 'Поле не должно быть пустым';
      }
    },
    emailErrorText() {
      switch (true) {
        case this.v$.email.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.email.email.$invalid:
          return 'Неверный email';
        case this.errors.emailError:
          return 'Такая почта уже используется';
      }
    },
    passwordEditBtnLabel() {
      if(this.editPasswordIsOpen) return "Отменить";
      return "Изменить пароль"
    },
    passwordIsEdit() {
      return this.editPasswordIsOpen && this.newPassword && this.user.password !== this.newPassword
    }
  },
  methods: {
    ...mapMutations({
      saveUser: "saveUser",
      saveUserUid: "saveUserUid",
      loadingOn: "loadingOn",
      loadingOff: "loadingOff"
    }),
    async formValidate() {
      let formIsValidate = await this.v$.$validate()
      if(this.user) {
        switch (false) {
          case await this.v$.oldPassword.$validate():
            this.errors.oldPassword = true;
            break;
          case await this.v$.confirmNewPassword.$validate():
            this.errors.confirmNewPassword = true;
            break;
        }
      } else {
        switch (false) {
          case await this.v$.confirmCreatedPassword.$validate():
            this.errors.confirmCreatedPassword = true;
            break;
        }
      }
      return formIsValidate
    },
    switchPasswordEdit() {
      this.editPasswordIsOpen = !this.editPasswordIsOpen;
    },
    async sendForm() {
      this.loadingOn();
      const isFormCorrect = await this.formValidate();
      console.log('isFormCorrect', isFormCorrect)
      if(!isFormCorrect) {
        this.loadingOff();
        return;
      }
      this.user ? await this.update() : await this.create()
    },
    uploadAvatarPreview(file) {
      if(!file) return
      this.removedAvatar = this.user?.avatar ? {...this.user.avatar} : null;
      const reader = new FileReader();
      reader.onloadend = () => {
        this.avatar = {
          name: file.name,
          url: reader.result,
        }
      };
      reader.readAsDataURL(file);
      this.addedAvatar = file;
    },

    removeAvatarPreview() {
      if(this.user?.avatar) this.removedAvatar = {...this.avatar};
      this.avatar = this.addedAvatar = null;
    },

    cancel() {
      this.$router.push('./')
    },
    async create() {
      let image = null;
      let newUser = null;
      try {
        newUser = await createUser({ email: this.email, password: this.createdPassword })
      } catch (error) {
        this.errors.emailError = true
        throw error
      }
      this.saveUserUid(newUser.uid)
      if(this.addedAvatar) {
        image = await saveImage({ image: this.addedAvatar, uid: this.userUid });
      };
      const user = {
        avatar: image || "",
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        dob: this.dob,
        email: this.email,
        password: this.createdPassword,
        city: this.city,
        phone: this.phone,
        languages: this.selectedLanguages
      };
      const data = {
        profile: user,
        uid: newUser.uid
      };
      await createProfile(data);
      this.saveUser(user);
      this.$router.push('./');
    },
    async update() {
      if(this.user.email !== this.email) {
        try {
          const data = {
            email: this.user.email,
            password: this.user.password,
            newEmail: this.email
          };
          await updateEmail(data);
        } catch (error) {
          this.loadingOff()
          this.errors.emailError = true
          throw error
        }
      }
      if(this.passwordIsEdit) {
        try {
          const data = {
            email: this.email,
            password: this.user.password,
            newPassword: this.newPassword
          };
          await updatePassword(data);
        } catch (error) {
          this.loadingOff()
          throw error
        }
      }
      let newImage = null
      if(this.removedAvatar) {
        await removeImage(this.removedAvatar);
      };
      if(this.addedAvatar) {
        newImage = await saveImage({ image: this.addedAvatar, uid: this.userUid });
      };
      const user = {
        avatar: newImage || this.avatar || "",
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        dob: this.dob,
        email: this.email,
        city: this.city,
        phone: this.phone,
        languages: this.selectedLanguages,
        password: this.passwordIsEdit ? this.newPassword : this.user.password
      };

      const data = {
        profile: user,
        uid: this.userUid,
        key: this.key
      };
      await updateProfile(data);
      this.saveUser(user);
      this.loadingOff()
      this.$router.push('./');
    }
  },
  watch: {
    oldPassword() {
      this.errors.oldPassword = false;
    },
    newPassword() {
      this.errors.confirmNewPassword = false;
    },
    createdPassword() {
      this.errors.confirmCreatedPassword = false;
    },
    confirmNewPassword() {
      this.errors.confirmNewPassword = false;
    },
    confirmCreatedPassword() {
      this.errors.confirmCreatedPassword = false;
    },
    email() {
      this.errors.emailError = false
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-form {
  font-family: 'Montserrat', sans-serif;
  max-width: 510px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 60px 10px;

  &__phone__code {
    width: 100px;

    input {
      border: none
    }
  }

  &__password--create {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }

  &__password--edit {

    &__controls {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 30px;
      margin-bottom: 30px;
    }

    &__btn {
      margin: auto;
    }
  }

  &__buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
}
</style>