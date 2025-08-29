import styles from './UserFeedback.module.css'

export default function UserFeedback({ message }) {
	return <p className={`text-3 ${styles.mainAppPlaceholderText}`}>{ message }</p>
}