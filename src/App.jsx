import { useForm } from 'react-hook-form';
import './App.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
	nameRequired: z.string().min(1, 'This is required.'),
	nameMinLength: z.string().min(4),
});

function App() {
	const { register, handleSubmit, watch, formState } = useForm({
		mode: 'all',
		defaultValues: {
			nameRequired: '',
			nameMinLength: 'fsddsfadsf',
		},
		resolver: zodResolver(schema),
	});
	const { errors, isSubmitting, isSubmitSuccessful } = formState;
	console.log('✌️isSubmitting --->', isSubmitting);
	console.log(formState);
	// console.log('✌️errors --->', errors);
	async function submitHandler(data) {
		// console.log('✌️data --->', data);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// throw new Error('adsf');
	}
	return (
		<>
			<form onSubmit={handleSubmit(submitHandler)}>
				<label>
					Name Required:{' '}
					<input
						{...register('nameRequired', {
							// required: 'This is required.',
						})}
					/>
				</label>
				<p>{errors.nameRequired?.message}</p>
				<label>
					Name Min Length:{' '}
					<input
						{...register('nameMinLength', {
							required: 'This is required',
							// minLength: { value: 4, message: 'At least 4 characters required.' },
						})}
					/>
				</label>
				<p>{errors.nameMinLength?.message}</p>
				<button type="submit" disabled={Object.entries(errors).length}>
					{isSubmitting ? 'loading...' : 'Submit'}
				</button>
				{isSubmitSuccessful && <p>Success</p>}
			</form>
		</>
	);
}

export default App;
