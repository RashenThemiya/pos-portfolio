import companyLogo from '../../assets/company-logo.svg';

export function BrandMark(props) {
  return <img className="brand-mark" src={companyLogo} alt="" aria-hidden="true" {...props} />;
}
