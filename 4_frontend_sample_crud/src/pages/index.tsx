import Layout from "../components/layout";
import cafeBackgroundImage from "../assets/images/bg-cafe-1.jpg";
import chaaim from "../assets/images/1111.jpg";
import coffeeImage from "../assets/images/coffee-1.jpg";

export default function HomePage() {
  return (
    <Layout>
      <section
        className="h-[500px] w-full text-white bg-orange-800 bg-cover bg-blend-multiply flex flex-col justify-center items-center px-4 text-center"
        style={{
          backgroundImage: `url(${cafeBackgroundImage})`,
        }}
      >
        <h1 className="text-5xl mb-2">ยินดีต้อนรับสู่ IoT Library & Cafe</h1>
        <h2>ร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน</h2>
      </section>

      <section className="container mx-auto py-8">
        <h1>เกี่ยวกับเรา</h1>

        <div className="grid grid-cols-3 gap-4">
          <p className="text-left col-span-2">
            IoT Library & Cafe เป็นร้านกาแฟที่มีหนังสืออยู่นิดหน่อยให้คุณได้อ่าน
            และเรียนรู้เรื่องใหม่ๆ ที่เกี่ยวกับเทคโนโลยี IoT โดยคาเฟ่ของเรานั้น ก่อตั้งขึ้นโดย
            ผศ.ดร. ปานวิทย์ ธุวะนุติ ซึ่งเป็นอาจารย์ในวิชา Internet of Things และนายกฤตณัฏฐ์
            ศิริพรนพคุณ เป็นผู้ช่วยสอนในหัวข้อ FastAPI และ React ในวิชานี้
          </p>

          <div>
            <img src={chaaim} alt="chuti jai" className="h-full w-full object-cover" />
          </div>
        </div>
        <p className="text-pretty mt-8">
          ปัจจุบันค่าเฟ่ และห้องสมุดของเรา อยู่ในช่วงการดูแลของ นางสาวชุติกาญจน์ ใจคง รหัส 65070053
          ยินดีต้อนรับสู่ IoT Library & Cafe ซึ่งเป็นคาเฟ่ที่อบอุ่นและเต็มไปด้วยบรรยากาศอันน่าหลงใหล ที่นี่เป็นสถานที่สำหรับคนรักกาแฟและเป็นแหล่งพักผ่อนสำหรับผู้ที่ชื่นชอบการอ่านหนังสืออีกด้วย
          ที่ IoT Library & Cafe เราเชื่อว่ากาแฟไม่ใช่แค่เครื่องดื่มแต่เป็นศิลปะ เราคัดสรรเมล็ดกาแฟคุณภาพสูงจากแหล่งปลูกที่มีชื่อเสียงทั่วโลก และนำมาผ่านกระบวนการคั่วอย่างพิถีพิถันเพื่อให้ได้รสชาติและกลิ่นที่สมบูรณ์แบบ บาริสต้าของเรามีทั้งความชำนาญและใส่ใจในทุกขั้นตอน ตั้งแต่การบดเมล็ดกาแฟจนถึงการเสิร์ฟกาแฟร้อน ๆ ที่พร้อมจะสร้างความสุขให้กับคุณ
          นอกจากกาแฟแล้ว พิเศษสุด ๆ สำหรับนักอ่าน เรามีพื้นที่นั่งอ่านหนังสือที่เงียบสงบและสะดวกสบาย พร้อมด้วยชั้นหนังสือที่เต็มไปด้วยหนังสือหลากหลายประเภท คุณสามารถยืมหนังสืออ่านระหว่างที่คุณเพลิดเพลินกับกาแฟถ้วยโปรดของคุณได้ หรือหากต้องการนำกลับบ้าน เราก็มีบริการให้ยืมหนังสือเพื่อให้คุณสามารถสนุกกับการอ่านต่อที่บ้าน
          บรรยากาศของคาเฟ่เราถูกออกแบบให้มีความเป็นธรรมชาติและอบอุ่น เหมาะสำหรับการพักผ่อน พบปะเพื่อนฝูง หรือทำงานอย่างสงบสุข เรามีพื้นที่นั่งทั้งในร่มและกลางแจ้ง พร้อมบริการ Wi-Fi ฟรี เพื่อให้คุณได้เพลิดเพลินกับช่วงเวลาที่คาเฟ่ของเราอย่างเต็มที่
          ขอบคุณที่เลือก IoT Library & Cafe เป็นส่วนหนึ่งของวันของคุณ เราหวังว่าคุณจะมีช่วงเวลาที่ดีและประสบการณ์ที่น่าจดจำในทุกครั้งที่มาเยี่ยมเรา

        </p>
      </section>

      <section className="w-full flex justify-center">
        <img src={coffeeImage} alt="Coffee" className="w-full" />
      </section>
    </Layout>
  );
}
