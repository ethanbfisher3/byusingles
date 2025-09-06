import React from "react"

const Box = ({
  title,
  description,
  imgSrc,
  smallInformation,
  bigInformation,
}) => {
  return (
    <div className="box">
      <div className="box-top">
        <h2 className="box-title">{title}</h2>

        {description ? (
          <div className="box-description">
            {description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="box-bottom">
        <div className="box-information">
          {smallInformation ? (
            <div className="small-information">
              {smallInformation.map((info, index) => {
                return <div key={index}>{info}</div>
              })}
            </div>
          ) : null}
          {bigInformation ? (
            <div className="big-information">
              {bigInformation.map(({ className, text, style }, index) => {
                return (
                  <div key={index} className={className} style={style}>
                    {text}
                  </div>
                )
              })}
            </div>
          ) : null}
        </div>
        <img src={imgSrc} alt="" className="box-image" />
      </div>
    </div>
  )
}

export default Box
