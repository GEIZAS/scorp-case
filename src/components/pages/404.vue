<template>
	<v-content>
		<v-container fill-height>
			<v-col align="center" justify="center">
				<v-icon size="256">mdi-sign-direction-remove</v-icon>
				<h1 class="my-12">Sorry, I could not find this page :(</h1>
				<v-row align="center" justify="center">
					<v-btn class="ma-2" @click="$router.go(-1)">
						<v-icon left>mdi-arrow-left</v-icon>Back
					</v-btn>
					<v-btn class="ma-2" link to="/">
						Home
						<v-icon right>home</v-icon>
					</v-btn>
				</v-row>
			</v-col>
		</v-container>
	</v-content>
</template>
