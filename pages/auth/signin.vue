<script setup>
import {signIn} from 'next-auth/react'
import signinSchema from '~/server/schemas/signin.schema'

const formState = reactive({
      email: undefined,
      password: undefined
})

const onSubmit = async event => {
      await signIn(event.data)
}
</script>
<template>
      <div class="grid lg:grid-cols-2 h-screen">
            <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 2xl:px-52">
                  <div class="flex justify-center">
                        <Logo />
                  </div>
                  <h1 class="text-center font-bold text-xl my-4">Login yo your account</h1>
                  <UCard>
                        <UForm :schema="signinSchema" :state="formState" class="space-y-4" @submit="onSubmit">
                              <UFormGroup label="Email" name="email">
                                    <UInput v-model="formState.email" />
                              </UFormGroup>
                              <UFormGroup label="Password" name="password">
                                    <UInput v-model="formState.password" />
                              </UFormGroup>
                              <UButton type="submit" block>Login</UButton>
                        </UForm>
                  </UCard>
            </div>
            <div class="right hidden lg:block">
                  <div></div>
            </div>
      </div>
</template>
<style>
.right {
      background: linear-gradient(-45deg, #22c55e, #10b981, #84cc16, #23d5ab);
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
}

@keyframes gradient {
      0% {
            background-position: 0% 50%;
      }

      50% {
            background-position: 100% 50%;
      }

      100% {
            background-position: 0% 50%;
      }
}
</style>
