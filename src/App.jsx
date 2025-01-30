import { useForm } from 'react-hook-form';
import './App.css';

function App() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			nameRequired: 'fa',
			nameMinLength: 'fsddsfadsf',
		},
	});

	console.log('✌️errors --->', errors);
	function submitHandler(data) {
		console.log('✌️data --->', data);
	}
	return (
		<>
			<form onSubmit={handleSubmit(submitHandler)}>
				<label>
					Name Required: <input {...register('nameRequired', { required: 'This is required.' })} />
				</label>
				<p>{errors.nameRequired?.message}</p>
				<label>
					Name Min Length:{' '}
					<input
						{...register('nameMinLength', {
							required: 'This is required',
							minLength: { value: 4, message: 'At least 4 characters required.' },
						})}
					/>
				</label>
				<p>{errors.nameMinLength?.message}</p>
				<button type="submit" disabled={Object.entries(errors).length}>
					Submit
				</button>
			</form>
		</>
	);
}

export default App;
