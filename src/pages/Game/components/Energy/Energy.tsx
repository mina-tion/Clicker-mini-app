import lightningIcon from  '@assets/images/icons/lightning.svg';
import { Flex, Image, chakra } from '@chakra-ui/react';
import { ProgressBar } from '@components/ProgressBar';
import { Title } from '@components/Title';
import { useMemo } from 'react';

interface EnergyProps {
  value: number;
  maxValue: number;
}

export function Energy({ value, maxValue } : EnergyProps) {

  const percentageEnergy = useMemo(() => (value / maxValue) * 100, [value, maxValue]);
  return (
    <Flex
      className="prevent-select" 
      sx={{
        w: '100%',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(15px)',
        borderRadius: '12px'
      }}>
      <Flex p="0" justifyContent="space-between" width="100%" alignItems="center" gap="4px">
        <Flex p="0" justifyContent="center" alignItems="center" gap="4px">
          <Image w="14px" h="20px" src={lightningIcon} />
          <Title variant="medium" color="#FDFAFF">Energy</Title>
        </Flex>
        <Title variant="medium" color="#FDFAFF">
          {`${value}/`}
          <chakra.span color="#868686" >
           {maxValue}
          </chakra.span>
        </Title>
      </Flex>
      <ProgressBar value={percentageEnergy}/>
    </Flex>
  );
}
