<script setup>
const { data, signOut } = useAuth();

const handleSignOut = async () => {
	await signOut({ callbackUrl: '/auth/signin' });
};

const menu = ref([
	[
		{
			label: 'Proflie',
			slot: 'profile',
			disabled: true
		}
	],
	[
		{
			label: 'Billing',
			icon: 'i-heroicons-credit-card',
			click: () => {}
		}
	],
	[
		{
			label: 'Sign out',
			icon: 'i-heroicons-arrow-left-on-rectangle',
			click: handleSignOut
		}
	]
]);
</script>
<template>
	<div>
		<header
			class="p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800"
		>
			<UContainer>
				<div class="flex justify-between">
					<NuxtLink to="/">
						<Logo />
					</NuxtLink>
					<div class="flex justify-end gap-4 items-center">
						<slot name="actions"></slot>
						<ColorSwitcher />
						<UDropdown :items="menu" :ui="{}">
							<UIcon
								name="i-heroicons-user-circle"
								class="w-8 h-8"
							/>
							<template #profile>
								<div class="text-left">
									<p>Signed in as</p>
									<p
										class="break-all font-medium text-gray-900 dark:text-white"
									>
										{{ data?.email }}
									</p>
								</div>
							</template>
						</UDropdown>
					</div>
				</div>
			</UContainer>
		</header>
		<main class="my-4">
			<UContainer>
				<slot />
			</UContainer>
		</main>
	</div>
</template>
