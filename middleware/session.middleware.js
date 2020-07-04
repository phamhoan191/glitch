var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
  if (!req.signedCookies.sessionId) { // check is session exist ?
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true
    });
    
    db.get('sessions').push({
      id: sessionId
    }).write();
  } 
  // if it exist then get data of it.
  
  // ở đây mình sẽ lấy data của session theo id ra rồi xử lý
  
  //xong làm sao lấy đc cái id sách kia vậy ạ
  // mình xử lý nó bạn có thể lôi ra data của cuốn sách đó nếu muốn
  
  /** 
    {
      "id": "VbmxvQaO4",
      "cart": {
        "EHjWFfTRD": 4
      }
    }
  */
  
  // data của mình như này 
  // cái mình cần là xử lý cart kia
  // giờ mình thử lôi tên ra theo bookId nhá
//ok có quantity r
  // b có ở đấy k @@
  
  

  
  /** 
    listCart :[ { name: 'One piece', description: 'Đảo hải tặc', id: 'EHjWFfTRD' } ]
    total : 1
  */
  
  // giờ lấy thêm tên user nữa xong nhét vào locals nhỉ
  // từ cart đấy tạo transaction mới
  // {
  //     "userId": "Pham Tien Hoan", ok thế bạn qua cart đi chắc mình sẽ sử lý bên đó
  //     "bookId": "One piece", // @@ ủa id mà ?? name đó mình viết nhầm @@
  //     "isComplete": "false", // cái này có sẽ nè
  //     "id": "mWNbUNrWV"  // cái này tự tạo nè
  //   }
  
  // user thì khi mình đăng nhập vào nó có cookies rồi nên mình không cần lưu vào locals nữa mình có thể lấy thông qua userId ở cookies cũng đc :3
  // hừm bây giờ bạn muốn là gì tiếp nhỉ, mình có data ở khawos 
  //có vẻ ổn nhỉ
  // ok h set cho biến local thôi
  // debug của glitch này củ chuối nên mình cũng kb test sao ...
  // hừm như này ra chứ nhỉ, consle.log(everything) :))
  // bạn code đi có gì không ổn mình sẽ note ra
  // ok để thử chạy xem sao
  
  next();
}

// hừm bạn viết ở trong cart rồi thì mình không tận dụng res.locals để ném cái session của người dùng kèm với cái cart người dùng đang cầm nhỉ
// bạn ra serverjs đi 