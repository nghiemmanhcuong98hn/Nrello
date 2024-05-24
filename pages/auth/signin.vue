<script setup>
useSeoMeta({
	title: 'Sign up',
	description: 'Project management doashboard'
});
import signinSchema from '~/server/schemas/signin.schema';

const { $logDebug } = useNuxtApp();
const { signIn } = useAuth();

const isLoading = ref(false);
const formState = reactive({
	email: undefined,
	password: undefined
});

const onSubmit = async event => {
	try {
		isLoading.value = true;
		const res = await signIn('credentials', {
			email: event.data.email,
			password: event.data.password,
			redirect: false
		});
		if (!res?.error) {
			useRouter().push('/');
		}
	} catch (error) {
		$logDebug('Log debug line 25[pages/Signin.vue]:', error);
	} finally {
		isLoading.value = false;
	}
};
</script>
<template>
	<WrapperAuth title="Login to your account">
		<UCard>
			<UForm
				:schema="signinSchema"
				:state="formState"
				class="space-y-4"
				@submit="onSubmit"
			>
				<UFormGroup label="Email" name="email">
					<UInput v-model="formState.email" />
				</UFormGroup>
				<UFormGroup label="Password" name="password">
					<UInput v-model="formState.password" type="password" />
				</UFormGroup>
				<UButton :loading="isLoading" type="submit" block
					>Login</UButton
				>
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
