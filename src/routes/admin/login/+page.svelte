<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let showPassword = $state(false);
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Admin Login | Anmar Binawisata</title>
</svelte:head>

<div class="shell" aria-label="Halaman masuk admin">
	<section class="hero">
		<div class="hero-top">
			<div class="hero-mark">
				<img class="hero-logo" src="/logo.svg" alt="" width="48" height="48" />
			</div>
			<p class="hero-kicker">Anmar Binawisata</p>
		</div>

		<div class="hero-body">
			<h1 class="hero-title">Kelola konten &amp; promo dari satu tempat.</h1>
			<p class="hero-lede">
				Panel ini untuk tim internal. Pastikan Anda memakai kredensial yang diberikan administrator.
			</p>
		</div>

		<p class="hero-foot">Akses terbatas · Sesi aman dengan cookie httpOnly</p>
	</section>

	<section class="panel">
		<div class="panel-inner">
			<header class="panel-head">
				<h2 class="panel-title">Masuk</h2>
				<p class="panel-sub">Gunakan username dan password admin Anda.</p>
			</header>

			<form
				method="POST"
				class="card"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				{#if form?.message}
					<p class="form-alert" role="alert">{form.message}</p>
				{/if}

				<label>
					<span>Username</span>
					<input
						name="username"
						type="text"
						autocomplete="username"
						required
						value={form?.username ?? ''}
					/>
				</label>

				<label>
					<span>Password</span>
					<div class="password-row">
						<input
							name="password"
							type={showPassword ? 'text' : 'password'}
							autocomplete="current-password"
							required
						/>
						<button
							type="button"
							class="toggle"
							aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
							onclick={() => (showPassword = !showPassword)}
						>
							{#if showPassword}
								<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
									<path
										d="M2.1 3.51 3.51 2.1 21.9 20.49 20.49 21.9l-3.3-3.3A11.2 11.2 0 0 1 12 20C6.73 20 2.2 16.7.5 12c.68-1.83 1.8-3.44 3.25-4.76L2.1 3.51Zm6.16 6.16a3.8 3.8 0 0 0-.26 1.33A4 4 0 0 0 12 15a3.8 3.8 0 0 0 1.33-.26l-1.2-1.2A2 2 0 0 1 10.46 11l-2.2-2.2ZM12 4c5.27 0 9.8 3.3 11.5 8-.78 2.1-2.15 3.92-3.95 5.3l-2.1-2.1c.37-.64.55-1.37.55-2.1a6 6 0 0 0-6-6c-.73 0-1.46.18-2.1.55L7.25 5.95A11.3 11.3 0 0 1 12 4Z"
									/>
								</svg>
							{:else}
								<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
									<path
										d="M12 5c-5.05 0-9.27 3.11-11 7 1.73 3.89 5.95 7 11 7s9.27-3.11 11-7c-1.73-3.89-5.95-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</label>

				<button type="submit" class="submit" disabled={submitting}>
					{submitting ? 'Memverifikasi…' : 'Masuk ke panel'}
				</button>
			</form>

			<p class="back">
				<a href="/">← Kembali ke website</a>
			</p>
		</div>
	</section>
</div>

<style>
	.shell {
		min-height: 100dvh;
		display: grid;
		grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
		background: var(--white);
	}

	.hero {
		position: relative;
		overflow: hidden;
		padding: clamp(1.75rem, 4vw, 3rem);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		color: rgba(255, 255, 255, 0.92);
		background:
			radial-gradient(120% 90% at 10% 0%, rgba(255, 255, 255, 0.14), transparent 55%),
			radial-gradient(90% 70% at 100% 100%, rgba(15, 118, 110, 0.55), transparent 50%),
			linear-gradient(155deg, #022c22 0%, #064e3b 42%, #0f766e 100%);
	}

	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath fill='%23ffffff' fill-opacity='0.04' d='M28 0h1v56H28zM0 28h56v1H0z'/%3E%3C/svg%3E");
		pointer-events: none;
		opacity: 0.9;
	}

	.hero-top,
	.hero-body,
	.hero-foot {
		position: relative;
		z-index: 1;
	}

	.hero-top {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.hero-mark {
		width: fit-content;
		padding: 0.35rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.18);
		backdrop-filter: blur(10px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
	}

	.hero-logo {
		display: block;
		border-radius: 0.75rem;
	}

	.hero-kicker {
		font-weight: 800;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.72);
	}

	.hero-title {
		font-family: var(--font-display);
		font-size: clamp(1.65rem, 2.4vw + 0.6rem, 2.35rem);
		font-weight: 700;
		line-height: 1.18;
		letter-spacing: -0.03em;
		max-width: 22ch;
		color: #fff;
	}

	.hero-lede {
		margin-top: 1rem;
		max-width: 40ch;
		font-size: 1.02rem;
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.78);
	}

	.hero-foot {
		font-size: 0.82rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.55);
		letter-spacing: 0.01em;
	}

	.panel {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(1.5rem, 4vw, 3rem);
		background:
			radial-gradient(80% 55% at 50% 0%, rgba(6, 78, 59, 0.07), transparent 60%),
			linear-gradient(180deg, #fbfbfb 0%, #f4f4f5 100%);
	}

	.panel-inner {
		width: min(100%, 420px);
		display: flex;
		flex-direction: column;
		gap: 1.35rem;
	}

	.panel-head {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.panel-title {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 700;
		letter-spacing: -0.03em;
		color: var(--text);
	}

	.panel-sub {
		color: var(--text-light);
		font-weight: 600;
		font-size: 0.95rem;
		line-height: 1.45;
	}

	.form-alert {
		margin: 0;
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		font-weight: 800;
		font-size: 0.92rem;
		color: #7f1d1d;
		background: rgba(180, 35, 24, 0.1);
		border: 1px solid rgba(180, 35, 24, 0.22);
	}

	.card {
		background: var(--white);
		border: 1px solid var(--border);
		border-radius: 18px;
		padding: clamp(1.25rem, 3vw, 1.65rem);
		display: flex;
		flex-direction: column;
		gap: 1rem;
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.9) inset,
			0 22px 50px rgba(15, 23, 42, 0.08);
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label span {
		font-weight: 700;
		font-size: 0.82rem;
		color: var(--text);
		letter-spacing: 0.01em;
	}

	input {
		height: 50px;
		padding: 0 14px;
		border: 1px solid var(--border);
		border-radius: 12px;
		font: inherit;
		font-weight: 600;
		background: #fafafa;
		width: 100%;
		color: var(--text);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			background 0.15s ease;
	}

	input:hover {
		background: #f4f4f5;
	}

	input:focus {
		outline: none;
		border-color: rgba(6, 78, 59, 0.45);
		box-shadow: 0 0 0 3px rgba(6, 78, 59, 0.12);
		background: var(--white);
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--text);
		transition: background-color 9999s ease-out;
		box-shadow: 0 0 0 1000px #f4f4f5 inset !important;
	}

	.password-row {
		position: relative;
		display: flex;
		align-items: center;
	}

	.password-row input {
		padding-right: 52px;
	}

	.toggle {
		position: absolute;
		right: 6px;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid var(--border);
		border-radius: 10px;
		background: var(--white);
		cursor: pointer;
		color: var(--primary);
		transition:
			background 0.15s ease,
			border-color 0.15s ease;
	}

	.toggle:hover {
		background: #fafafa;
		border-color: rgba(6, 78, 59, 0.35);
	}

	.toggle:focus-visible {
		outline: 3px solid rgba(6, 78, 59, 0.22);
		outline-offset: 2px;
	}

	.submit {
		margin-top: 0.25rem;
		height: 52px;
		border: 0;
		border-radius: 12px;
		font-weight: 800;
		font-size: 1rem;
		letter-spacing: 0.01em;
		cursor: pointer;
		background: var(--primary);
		color: white;
		box-shadow: 0 10px 24px rgba(6, 78, 59, 0.28);
		transition:
			transform 0.12s ease,
			box-shadow 0.12s ease,
			filter 0.12s ease;
	}

	.submit:hover {
		filter: brightness(1.05);
		box-shadow: 0 14px 32px rgba(6, 78, 59, 0.32);
	}

	.submit:active {
		transform: translateY(1px);
	}
	.submit:disabled {
		opacity: 0.75;
		cursor: wait;
		transform: none;
	}

	.back {
		text-align: center;
		font-size: 0.9rem;
		font-weight: 700;
	}

	.back a {
		color: var(--text-light);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}

	.back a:hover {
		color: var(--primary);
		border-bottom-color: rgba(6, 78, 59, 0.35);
	}

	@media (max-width: 900px) {
		.shell {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
		}

		.hero {
			min-height: unset;
			padding: 1.5rem 1.25rem 2rem;
		}

		.hero-body {
			padding-bottom: 0.25rem;
		}

		.hero-title {
			max-width: none;
		}

		.hero-foot {
			display: none;
		}

		.panel {
			padding: 0 1.25rem 2rem;
			align-items: flex-start;
		}

		.panel-inner {
			margin-top: -1.25rem;
		}

		.card {
			box-shadow:
				0 1px 0 rgba(255, 255, 255, 0.9) inset,
				0 18px 40px rgba(15, 23, 42, 0.1);
		}
	}

	@media (max-width: 420px) {
		.card {
			border-radius: 16px;
		}
	}
</style>
