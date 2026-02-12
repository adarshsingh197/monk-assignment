import { useState } from 'react';
import DragHandle from '../assets/icons/DragHandle.svg';
import DragHandleActive from '../assets/icons/DragHandleActive.svg';
import Close from '../assets/icons/Close.svg';
import CloseActive from '../assets/icons/CloseActive.svg';
import ExpandMore from '../assets/icons/ExpandMoreBlack.svg';
import ExpandLess from '../assets/icons/ExpandLessBlack.svg';
import { useProductContext } from '../utils/ProductContext';

export const Variant = ({ parentId, id, discount='20', remove, title }) => {
    const [showDiscount, setShowDiscount] = useState(false);
    const [discountType, setDiscountType] = useState('flat off')
    const [showDiscountValues, setshowDiscountValues] = useState(false)
    const [drag, setDrag] = useState(false);
    const { products, setProducts } = useProductContext();

    return (
        <>

            <div className='flex gap-4 w-5/6 h-[40px] rounded-full' onMouseEnter={() => setDrag(true)} onMouseLeave={() => setDrag(false)}>
                <div className='flex gap-4 w-full h-full items-center'>

                    {/* handle */}
                    <img src={drag ? DragHandleActive : DragHandle} alt='draghandle' className='h-3/5' />

                    {/* Product Title */} 
                    <div className='flex flex-5-8 h-full items-center justify-between pl-4 pr-4 bg-white custom-border rounded-full w-[70%]'>
                        <span>{title || 'No title'}</span>
                    </div>

                    {/* Discount Input or Display */}
                    <div className='flex-2 w-[25%]'>
                        {showDiscount ? (
                            <div className='flex items-center justify-between gap-4 relative'>
                                <input className='w-1/2 p-2 flex-1 border-t outline-none bg-white custom-border pl-4 rounded-full'
                                    min={0}
                                    max={100}
                                    type="number"
                                    value={discount}
                                    onChange={(e) => {
                                        const updatedProducts = products.map(product => ({
                                            ...product,
                                            variants: product.variants.map(variant =>
                                              variant.id === id
                                                ? { ...variant, discount: e.target.value }
                                                : variant
                                            )
                                          }));
                                          
                                          setProducts(updatedProducts);
                                    }}
                                />

                                <div className='flex text-center justify-between px-2 w-1/2 bg-red p-2 bg-white custom-border text-slate-900 rounded-full' onClick={() => setshowDiscountValues(v => !v)}>
                                    <div className='z-1'>{discountType}</div>
                                    {showDiscountValues ? <img src={ExpandMore} alt="" /> : <img src={ExpandLess} alt="" />}
                                </div>

                                <div className={`absolute top-2/3 bg-white rounded-md p-1 cursor-pointer right-0 flex flex-col z-50 ${showDiscountValues ? 'flex' : 'hidden'}`}>
                                    <div className='hover:bg-gray-400 p-1' onClick={() => {setDiscountType('flat Off'); setshowDiscountValues(v => !v)}}>flat Off</div>
                                    <div className='hover:bg-gray-400 p-1' onClick={() => {setDiscountType('% Off'); setshowDiscountValues(v => !v)}}>% Off</div>
                                </div>
                            </div>
                        ) : (
                            <button className='w-full h-[40px] text-white font-bold bg-green-700 p-2 cursor-pointer rounded'
                                onClick={() => setShowDiscount(true)}
                            >
                                Add Discount
                            </button>
                        )}
                    </div>


                    <img
                        src={Close}
                        alt="close"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => remove(parentId, id)}
                        onMouseEnter={(e) => e.target.src = CloseActive}
                        onMouseLeave={(e) => e.target.src = Close}
                    />

                    
                </div>
            </div>
        </>
    )
}