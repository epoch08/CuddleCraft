import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import styles from './ShoppingCart.module.css';

const ShoppingCart: React.FC = () => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems,
    isOpen, 
    setIsOpen 
  } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const orderSummary = items.map(item => ({
      id: item.id,
      size: item.selectedSize.label,
      service: item.selectedService.label,
      color: item.selectedColor.name,
      material: item.selectedMaterial.name,
      accessories: item.selectedAccessories.map(a => a.name),
      template: item.selectedTemplate?.name,
      quantity: item.quantity,
      itemTotal: item.totalPrice * item.quantity
    }));

    console.log('Checkout Order:', orderSummary);
    alert(`🎉 Thank you for your order!\n\nOrder Summary:\n${orderSummary.map((item, index) => 
      `${index + 1}. ${item.size} ${item.color} Plushie (${item.quantity}x) - $${item.itemTotal}`
    ).join('\n')}\n\nTotal: $${getTotalPrice()}\n\n📦 Your custom plushies will be crafted with love and shipped within 7-10 business days!`);
    
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button 
        className={styles.cartToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shopping Cart"
      >
        <ShoppingCartIcon size={24} />
        {getTotalItems() > 0 && (
          <span className={styles.cartBadge}>{getTotalItems()}</span>
        )}
      </button>

      {/* Cart Overlay */}
      {isOpen && (
        <div className={styles.cartOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.cart} onClick={(e) => e.stopPropagation()}>
            <div className={styles.cartHeader}>
              <h2>
                <ShoppingCartIcon size={20} />
                Shopping Cart ({getTotalItems()})
              </h2>
              <button 
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.cartBody}>
              {items.length === 0 ? (
                <div className={styles.emptyCart}>
                  <div className={styles.emptyCartIcon}>🛒</div>
                  <p>Your cart is empty</p>
                  <p className={styles.emptyCartSubtext}>Add some adorable plushies to get started!</p>
                </div>
              ) : (
                <div className={styles.cartItems}>
                  {items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemPreview}>
                        <div 
                          className={styles.colorSwatch}
                          style={{ backgroundColor: item.selectedColor.value }}
                        />
                        <div className={styles.itemInfo}>
                          <h4>{item.selectedSize.label} {item.selectedColor.name} Plushie</h4>
                          <p className={styles.itemDetails}>
                            {item.selectedMaterial.name} • {item.selectedService.label}
                            {item.selectedAccessories.length > 0 && (
                              <span> • {item.selectedAccessories.length} accessory{item.selectedAccessories.length > 1 ? 'ies' : ''}</span>
                            )}
                          </p>
                          {item.selectedTemplate && (
                            <p className={styles.templateInfo}>🎨 {item.selectedTemplate.name}</p>
                          )}
                        </div>
                      </div>

                      <div className={styles.itemActions}>
                        <div className={styles.quantityControls}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className={styles.itemPrice}>
                          ${item.totalPrice * item.quantity}
                        </div>

                        <button
                          className={styles.removeBtn}
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove from cart"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                  <div className={styles.totalRow}>
                    <span>Subtotal ({getTotalItems()} item{getTotalItems() > 1 ? 's' : ''})</span>
                    <span className={styles.totalPrice}>${getTotalPrice()}</span>
                  </div>
                  <div className={styles.estimatedShipping}>
                    <small>📦 Estimated delivery: 7-10 business days</small>
                  </div>
                </div>
                
                <div className={styles.cartActions}>
                  <button 
                    className={styles.clearBtn}
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <button 
                    className={styles.checkoutBtn}
                    onClick={handleCheckout}
                  >
                    🎉 Checkout - ${getTotalPrice()}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;