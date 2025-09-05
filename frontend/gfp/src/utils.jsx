import { MdSchool, MdDirectionsCar, MdRestaurant, MdHome, MdWallet  } from "react-icons/md";
import { MdOutlineSportsSoccer, MdAttachMoney, MdFitnessCenter, MdFavorite, MdPets, MdShoppingCart } from 'react-icons/md';


export const enderecoServidor = 'http://localhost:3000';

export const iconesCategoria = {
        'restaurant': <MdRestaurant className="w-6 h-6" />,
        'sports-soccer': <MdOutlineSportsSoccer className="w-6 h-6" />,
        'category': <MdAttachMoney className="w-6 h-6" />,
        'directions-car': <MdDirectionsCar className="w-6 h-6" />,
        'school': <MdSchool className="w-6 h-6" />,
        'home': <MdHome className="w-6 h-6"/>,
        'shopping-cart': <MdShoppingCart className="w-6 h-6"/>,
        'pets': <MdPets className="w-6 h-6"/>,
        'favorite': <MdFavorite className="w-6 h-6"/>,
        'fitness-center': <MdFitnessCenter className="w-6 h-6"/>,
        'wallet': <MdWallet className="w-6 h-6"/>,
    }

    export const nomesCategoria = {
        'restaurant': 'Alimentação',
        'sports-soccer': 'Lazer',
        'school': 'Escola',
        'directions-car': 'Trasporte',
        'home': 'Moradia',
        'shopping-cart': 'Compras',
        'pets': 'Animais',
        'favorite': 'Favoritos',
        'fitness-center': 'Academia',
        'wallet': 'Carteira'
    }