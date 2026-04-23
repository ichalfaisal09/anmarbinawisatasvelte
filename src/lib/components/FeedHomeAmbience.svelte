<div class="ambience" aria-hidden="true">
	<div class="blob b1"></div>
	<div class="blob b2"></div>
	<div class="blob b3"></div>
	<div class="grain"></div>
</div>

<style>
	.ambience {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(56px);
		opacity: 0.4;
		will-change: transform;
	}

	.b1 {
		width: min(72vw, 420px);
		height: min(72vw, 420px);
		background: radial-gradient(circle at 30% 30%, rgba(6, 78, 59, 0.24), transparent 65%);
		top: -8%;
		left: -18%;
		animation: float-a 22s ease-in-out infinite alternate;
	}

	.b2 {
		width: min(65vw, 360px);
		height: min(65vw, 360px);
		background: radial-gradient(circle at 60% 40%, rgba(217, 119, 6, 0.15), transparent 62%);
		top: 28%;
		right: -22%;
		animation: float-b 26s ease-in-out infinite alternate;
	}

	.b3 {
		width: min(80vw, 480px);
		height: min(80vw, 480px);
		background: radial-gradient(circle at 50% 50%, rgba(6, 78, 59, 0.09), rgba(255, 255, 255, 0) 55%);
		bottom: -5%;
		left: 10%;
		animation: float-c 28s ease-in-out infinite alternate;
	}

	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.025;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		mix-blend-mode: multiply;
		pointer-events: none;
	}

	@keyframes float-a {
		0% {
			transform: translate(0, 0) scale(1);
		}
		100% {
			transform: translate(12%, 6%) scale(1.06);
		}
	}

	@keyframes float-b {
		0% {
			transform: translate(0, 0) scale(1);
		}
		100% {
			transform: translate(-10%, 8%) scale(1.05);
		}
	}

	@keyframes float-c {
		0% {
			transform: translate(0, 0) scale(1);
		}
		100% {
			transform: translate(-6%, -5%) scale(1.04);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blob {
			animation: none;
			opacity: 0.35;
		}
	}
</style>
