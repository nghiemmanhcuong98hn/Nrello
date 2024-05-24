<script setup>
useSeoMeta({
	title: 'Sign up',
	description: 'Project management doashboard'
});
import signupSchema from '~/server/schemas/signup.schema'

const { $logDebug } = useNuxtApp();
const router = useRouter()
const toast = useToast()
const isLoading = ref(false)

const formState = reactive({
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined
})

const onSubmit = async event => {
      try {
            isLoading.value = true
            await useFetch('/api/auth/signup', {
                  method: 'POST',
                  body: event.data,
                  watch: false,
                  onResponse: ({ response: { status, _data } }) => {
                        if (status == 200) {
                              toast.add({
                                    title: 'Account created',
                                    icon: 'i-heroicons-check-circle-16-solid',
                                    color: 'green',
                                    description:
                                          'Your account has been created successfully, Redirecting you to the sign in page.'
                              })
                              router.push('/auth/signin')
                        } else {
                              toast.add({
                                    title: 'Error creating account',
                                    color: 'red',
                                    description: _data.message ?? 'Something went wrong!'
                              })
                        }
                  }
            })
      } catch (error) {
            $logDebug('Log debug line 42[pages/Signup.vue]:', error);
            toast.add({
                  title: 'Error creating account',
                  color: 'red',
                  description: error.message ?? 'Something went wrong!'
            })
      } finally {
            isLoading.value = false
      }
}
</script>
<template>
      <WrapperAuth title="Create a free account">
            <UCard>
                  <UForm :schema="signupSchema" :state="formState" class="space-y-4" @submit="onSubmit">
                        <UFormGroup label="Name" name="name">
                              <UInput v-model="formState.name" />
                        </UFormGroup>
                        <UFormGroup label="Email" name="email">
                              <UInput v-model="formState.email" />
                        </UFormGroup>
                        <UFormGroup label="Password" name="password">
                              <UInput v-model="formState.password" type="password" />
                        </UFormGroup>
                        <UFormGroup label="Confirm Password" name="confirmPassword">
                              <UInput v-model="formState.confirmPassword" type="password" />
                        </UFormGroup>
                        <UButton :loading="isLoading" type="submit" block>Create account</UButton>
                  </UForm>
            </UCard>
      </WrapperAuth>
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
