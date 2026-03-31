import { Plus, Minus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { CartItem } from "../types";
import { CONTACT_INFO } from "../constants";

interface CartDrawerProps {
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartDrawer({ cart, onRemove, onUpdateQuantity }: CartDrawerProps) {
  const total = cart.reduce((acc, item) => acc + item.selectedOption.price * item.quantity, 0);

  const checkoutViaWhatsApp = () => {
    const orderSummary = cart
      .map((item) => `- ${item.name} (${item.selectedOption.label}) x${item.quantity}: ${(item.selectedOption.price * item.quantity).toFixed(2)} درهم`)
      .join("\n");
    
    const message = `السلام عليكم، أريد طلب المنتجات التالية:\n\n${orderSummary}\n\nالمجموع: ${total.toFixed(2)} درهم`;
    
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <SheetContent className="flex w-full flex-col sm:max-w-lg" dir="rtl">
      <SheetHeader className="px-1 text-right">
        <SheetTitle className="flex items-center gap-2 text-oasis">
          <ShoppingBag className="h-5 w-5" />
          سلة المشتريات
        </SheetTitle>
      </SheetHeader>
      <Separator className="my-4" />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground opacity-20" />
            <p className="text-lg font-medium text-muted-foreground">السلة فارغة حالياً</p>
          </div>
        ) : (
          <ScrollArea className="h-full pl-4">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 text-right">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between text-base font-medium">
                      <div className="text-right">
                        <h3 className="font-bold text-oasis">{item.name}</h3>
                        <Badge variant="outline" className="mt-1 border-oasis/20 text-[10px] text-oasis">
                          {item.selectedOption.label}
                        </Badge>
                      </div>
                      <p className="mr-4 font-bold text-oasis">{item.selectedOption.price.toFixed(2)} درهم</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 rounded-md border p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {cart.length > 0 && (
        <SheetFooter className="mt-auto flex-col px-1 pt-4">
          <Separator className="mb-4" />
          <div className="flex justify-between text-lg font-bold text-oasis">
            <span>المجموع</span>
            <span>{total.toFixed(2)} درهم</span>
          </div>
          <Button 
            className="mt-4 w-full gap-2 bg-[#25D366] text-white hover:bg-[#25D366]/90" 
            size="lg"
            onClick={checkoutViaWhatsApp}
          >
            <MessageCircle className="h-5 w-5" />
            إتمام الطلب عبر واتساب
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
}
