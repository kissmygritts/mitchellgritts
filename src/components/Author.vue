<template>
	<div class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/nasa_250x250.jpg" width="250" height="250" blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			<!-- {{ $static.metaData.siteName }} -->
			Hi. I'm Mitchell Gritts
		</h1>

		<p class="author__intro">
			a wildlife ecologist, data analyst, and web developer based in Reno, Nevada
		</p>

		<!-- <p class="author__links">
			<a href="//twitter.com/gridsome">Follow on Twitter</a>
			<a href="//github.com/gridsome/gridsome-starter-blog">GitHub</a>
		</p> -->

	</div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
	props: ['showTitle']
}
</script>

<style lang="scss">
.author {
	margin: 0 auto;
	max-width: 800px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	&__image {
		border-radius: 100%;
		width: 190px;
		height: 190px;
		margin-bottom: 1em;
	}

	&__intro {
		opacity: .8;
	}

	&__site-title {
		font-size: 1.5em;
	}

	&__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
		}
	}
}
</style>