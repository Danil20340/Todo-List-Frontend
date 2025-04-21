import { Button, Card } from '@heroui/react';
import { Image } from '@heroui/image';
import lock from '../../assets/lock.svg';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "../../components/error-message"
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Input } from '../../components/input';
import { useLoginMutation } from '../../app/services/authAPI';
type Login = {
    login: string
    password: string
}

export const Auth = () => {
    const {
        handleSubmit,
        control,
    } = useForm<Login>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            login: "",
            password: "",
        },
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const [login, { isLoading }] = useLoginMutation()
    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap()
            // await triggerCurrentQuery()
            navigate("/")
        } catch (err) {
            if (hasErrorField(err)) {
                setError(err.data.error)
            }
        }
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card className='py-10 px-14 items-center gap-5'>

                <Image alt="Замок" src={lock} width={150} />
                <div className="text-center text-[#373745] leading-6 tracking-[0.24px] font-bold">
                    Авторизуйтесь
                </div>
                <div className='flex flex-col gap-4'>
                    <Input
                        control={control}
                        name="login"
                        label="Логин"
                        type="login"
                        required="Обязательное поле"
                    />
                    <Input
                        control={control}
                        name="password"
                        label="Пароль"
                        type="password"
                        required="Обязательное поле"
                    />
                </div>
                <ErrorMessage error={error} />
                <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Войти
                </Button>
            </Card>
        </form>
    );
};
